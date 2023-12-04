import Mock from 'mockjs';
import './data'
// 模拟成功登录的响应
const mockSuccessResponse = {
    code: 0,
    message: '登录成功',
    data: {
        token: 'fake-token-123456',
        userName: 'MockUser'
    }
};

// 模拟登录失败的响应
const mockErrorResponse = {
    code: 1,
    message: '用户名或密码错误'
};

// 模拟登录接口
Mock.mock('/api/login', 'post', (options: any) => {
    const { username, password } = JSON.parse(options.body);
    console.log('mock: ', username, password);
    // 假设正确的用户名和密码分别是 'admin' 和 '123456'
    if (username === 'admin' && password === '123456') {
        return mockSuccessResponse;
    } else {
        return mockErrorResponse;
    }
});
