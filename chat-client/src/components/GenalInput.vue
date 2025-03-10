<template>
  <div class="message-input" v-if="activeRoom">
    <a-popover placement="topLeft" trigger="hover" class="message-popver">
      <template slot="content">
        <a-tabs default-key="1" size="small">
          <a-tab-pane key="1" tab="Emoji">
            <genal-emoji @addEmoji="addEmoji"></genal-emoji>
          </a-tab-pane>
          <a-tab-pane key="2" tab="工具">
            <div class="message-tool-item">
              <a-upload :show-upload-list="false" :before-upload="beforeImgUpload">
                <div class="message-tool-contant">
                  <img src="~@/assets/photo.png" class="message-tool-item-img" alt="" />
                  <div class="message-tool-item-text">图片</div>
                </div>
              </a-upload>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
      <div class="messagte-tool-icon">😃</div>
    </a-popover>
    <a-input
      autocomplete="off"
      type="text"
      placeholder="say hello..."
      v-model="text"
      ref="input"
      autoFocus
      style="color:#000;"
      @pressEnter="throttle(preSendMessage)"
    />
    <img class="message-input-button" @click="throttle(preSendMessage)" src="~@/assets/send.png" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import GenalEmoji from './GenalEmoji.vue';
import { namespace } from 'vuex-class';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { now } from 'moment';
import COS from 'cos-js-sdk-v5';

const chatModule = namespace('chat');
const appModule = namespace('app');

@Component({
  components: {
    GenalEmoji,
  },
})
export default class GenalInput extends Vue {
  @appModule.Getter('user') user: User;
  @appModule.Getter('mobile') mobile: boolean;

  @chatModule.State('activeRoom') activeRoom: Group & Friend;
  @chatModule.Getter('socket') socket: SocketIOClient.Socket;
  @chatModule.Getter('dropped') dropped: boolean;
  @chatModule.Getter('groupGather') groupGather: GroupGather;
  @chatModule.Getter('userGather') userGather: FriendGather;

  text: string = '';
  lastTime: number = 0;

  mounted() {
    this.initPaste();
  }

  /**
   * 点击切换房间进入此方法
   */
  @Watch('activeRoom')
  changeActiveRoom() {
    this.$nextTick(() => {
      this.focusInput();
    });
  }

  /**
   * 监听图片粘贴事件
   */
  initPaste() {
    document.addEventListener('paste', (event) => {
      let items = event.clipboardData && event.clipboardData.items;
      let url = window.URL || window.webkitURL;
      let file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if (file) {
        this.throttle(this.handleImgUpload, file);
      }
    });
  }

  /**
   * 消息发送节流
   */
  throttle(fn: Function, file?: File) {
    let nowTime = +new Date();
    if (nowTime - this.lastTime < 500) {
      return this.$message.error('消息发送太频繁！');
    }
    fn(file);
    this.lastTime = nowTime;
  }

  /**
   * 消息发送前校验
   */
  preSendMessage() {
    if (!this.text.trim()) {
      this.$message.error('不能发送空消息!');
      return;
    }
    if (this.text.length > 220) {
      this.$message.error('消息太长!');
      return;
    }
    if (this.activeRoom.groupId) {
      this.sendMessage({ type: 'group', message: this.text, messageType: 'TEXT' });
    } else {
      this.sendMessage({ type: 'friend', message: this.text, messageType: 'TEXT' });
    }
    this.text = '';
  }

  /**
   * 消息发送
   */
  sendMessage(data: SendMessage) {
    if (data.type === 'group') {
      // this.socket.emit('groupMessage', {
      //   userId: this.user.userId,
      //   groupId: this.activeRoom.groupId,
      //   content: data.message,
      //   width: data.width,
      //   height: data.height,
      //   messageType: data.messageType,
      // });

      let chatMessage = {
        userId: this.user.userId,
        roomId: this.activeRoom.groupId,
        content: data.message.toString(),
        type: data.messageType,
        time: now().valueOf()
      }
      // 查看一下stomp对象是否为空
      console.log("stomp对象是否为空？", this.$store.state.chat.stompClient)
      console.log("连接还在吗？", this.$store.state.chat.stompClient.connected)
      console.log("显示一下订阅链接?", this.$store.state.chat.stompClient.subscriptions)
      // 使用chat state中的stompClient发送消息
      this.$store.state.chat.stompClient.send('/app/groupMessage', {}, JSON.stringify(chatMessage));

    }
  }

  /**
   * 添加emoji到input
   */
  addEmoji(emoji: string) {
    const inputDom = (this.$refs.input as Vue).$el as HTMLFormElement;
    if (inputDom.selectionStart || inputDom.selectionStart === '0') {
      // 得到光标前的位置
      const startPos = inputDom.selectionStart;
      // 得到光标后的位置
      const endPos = inputDom.selectionEnd;
      // 在加入数据之前获得滚动条的高度
      const restoreTop = inputDom.scrollTop;
      // emoji表情插入至当前光标指定位置
      this.text = this.text.substring(0, startPos) + emoji + this.text.substring(endPos, this.text.length);
      // 如果滚动条高度大于0
      if (restoreTop > 0) {
        // 返回
        inputDom.scrollTop = restoreTop;
      }
      inputDom.focus();
      // 设置光标位置至emoji表情后一位
      const position = startPos + emoji.length;
      if (inputDom.setSelectionRange) {
        inputDom.focus();
        setTimeout(() => {
          inputDom.setSelectionRange(position, position);
        }, 10);
      } else if (inputDom.createTextRange) {
        const range = inputDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    } else {
      this.text += emoji;
      inputDom.focus();
    }
  }

  /**
   * focus input框
   */
  focusInput() {
    if (!this.mobile) {
      // @ts-ignore
      this.$refs.input.focus();
    }
  }

  /**
   * 计算图片的比例
   */
  getImageSize(data: ImageSize) {
    let { width, height } = data;
    if (width > 335 || height > 335) {
      if (width > height) {
        height = 335 * (height / width);
        width = 335;
      } else {
        width = 335 * (width / height);
        height = 335;
      }
    }
    return {
      width,
      height,
    };
  }

  /**
   * 图片上传校验
   * @params file
   */
  beforeImgUpload(file: File) {
    this.throttle(this.handleImgUpload, file);
    return false;
  }

  /**
   * 图片消息发送
   * @params file
   */
  async handleImgUpload(imageFile: File) {
    const isJpgOrPng =
      imageFile.type === 'image/jpeg' || imageFile.type === 'image/png' || imageFile.type === 'image/jpg' || imageFile.type === 'image/gif';
    if (!isJpgOrPng) {
      return this.$message.error('请选择jpeg/jpg/png/gif格式的图片!');
    }
    const isLt1M = imageFile.size / 1024 / 1024 < 0.5;
    if (!isLt1M) {
      return this.$message.error('图片必须小于500K!');
    }

    console.log("发送图片函数", imageFile);
    let image = new Image();
    // let url = window.URL || window.webkitURL;
    // console.log("生成的临时的url", url);
    // image.src = url.createObjectURL(imageFile);
    // console.log("image.src", image.src)
    const cos = new COS({
      SecretId: 'AKID5yd4HH2lHafV7OSKyOceS2BEZ',
      SecretKey: 'JSPFtJckiYCdrumaEhjgVBi'
    });


    const cosParams = {
      Bucket: '', // 示例: 'examplebucket-1250000000'
      Region: '',       // 示例: 'ap-guangzhou'
      Key: '研究与开发实践/' + imageFile.name, // 示例: 'images/myphoto.png'
      Body: imageFile
    };
    // 上传图片至腾讯云
    cos.putObject(cosParams, (err: any, data: any) => {
      if (err) {
        console.log("上传图片失败", err);
      } else {
        console.log("上传图片成功", data);
        // 上传成功后，发送消息
        let chatMessage = {
          userId: this.user.userId,
          roomId: this.activeRoom.groupId,
          content: data.Location,
          type: 'IMAGE',
          time: now().valueOf()
        }
        this.$store.state.chat.stompClient.send('/app/groupMessage', {}, JSON.stringify(chatMessage));
      }
    });




    image.onload = () => {
      let imageSize: ImageSize = this.getImageSize({ width: image.width, height: image.height });
      this.sendMessage({
        type: this.activeRoom.groupId ? 'group' : 'friend',
        message: imageFile,
        width: imageSize.width,
        height: imageSize.height,
        messageType: 'IMAGE',
      });
    };
  }
}
</script>
<style lang="scss" scoped>
.message-input {
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  width: 100%;
  bottom: 0px;
  input {
    height: 40px;
  }
  .message-input-button {
    width: 30px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 4px;
  }
}

//输入框样式
.ant-input {
  padding: 0 50px 0 50px;
}
// 消息工具样式
.messagte-tool-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 40px;
  text-align: center;
  line-height: 42px;
  font-size: 16px;
  cursor: pointer;
  z-index: 99;
}
.message-tool-item {
  width: 0px;
  height: 240px;
  cursor: pointer;
  .message-tool-contant {
    width: 50px;
    padding: 5px;
    border-radius: 5px;
    transition: all linear 0.2s;
    .message-tool-item-img {
      width: 40px;
    }
    .message-tool-item-text {
      text-align: center;
      font-size: 10px;
    }
    &:hover {
      background: rgba(135, 206, 235, 0.6);
    }
  }
}
</style>

function commit(arg0: string, chatMessage: { userId: any; roomId: any; content: any; type: string; time: number; }) {
  throw new Error('Function not implemented.');
}
