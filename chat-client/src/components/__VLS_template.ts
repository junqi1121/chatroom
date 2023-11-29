import GenalAvatar from './GenalAvatar.vue';
import GenalActive from './GenalActive.vue';
import GenalInput from './GenalInput.vue';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from './GenalMessage.vue';

function __VLS_template() {
    let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
    /* Components */
    let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
    let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $scopedSlots: typeof __VLS_slots; })>;
    let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
    let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
    /* Style Scoped */
    type __VLS_StyleScopedClasses = {} &
    { 'message'?: boolean; } &
    { 'message-header'?: boolean; } &
    { 'message-header-text'?: boolean; } &
    { 'message-header-icon'?: boolean; } &
    { 'message-loading'?: boolean; } &
    { 'message-loading-icon'?: boolean; } &
    { 'message-main'?: boolean; } &
    { 'message-content'?: boolean; } &
    { 'message-content-noData'?: boolean; } &
    { 'message-content-message'?: boolean; } &
    { 'message-content-image'?: boolean; } &
    { 'message-content-image'?: boolean; } &
    { 'text-right'?: boolean; } &
    { 'avatar'?: boolean; } &
    { 'message-input'?: boolean; } &
    { 'message-input-button'?: boolean; } &
    { 'ant-input'?: boolean; } &
    { 'messagte-tool-icon'?: boolean; } &
    { 'message-tool-item'?: boolean; } &
    { 'message-tool-contant'?: boolean; } &
    { 'message-tool-item-img'?: boolean; } &
    { 'message-tool-item-text'?: boolean; } &
    { 'message-main'?: boolean; } &
    { 'message-content-image'?: boolean; } &
    { 'message-header-box'?: boolean; } &
    { 'message-header-text'?: boolean; } &
    { 'message-header-icon'?: boolean; } &
    { 'loading-enter-active'?: boolean; } &
    { 'loading-leave-active'?: boolean; } &
    { 'loading-leave-to'?: boolean; } &
    { 'noData-leave-active'?: boolean; } &
    { 'noData-leave-to'?: boolean; } &
    { 'transition'?: boolean; };
    let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
    /* CSS variable injection */
    /* CSS variable injection end */
    let __VLS_resolvedLocalAndGlobalComponents!: {} &
        __VLS_WithComponent<'AIcon', typeof __VLS_localComponents, "AIcon", "aIcon", "a-icon"> &
        __VLS_WithComponent<'GenalActive', typeof __VLS_localComponents, "GenalActive", "genalActive", "genal-active"> &
        __VLS_WithComponent<'transition', typeof __VLS_localComponents, "Transition", "transition", "transition"> &
        __VLS_WithComponent<'GenalAvatar', typeof __VLS_localComponents, "GenalAvatar", "genalAvatar", "genal-avatar"> &
        __VLS_WithComponent<'viewer', typeof __VLS_localComponents, "Viewer", "viewer", "viewer"> &
        __VLS_WithComponent<'GenalInput', typeof __VLS_localComponents, "GenalInput", "genalInput", "genal-input">;
    __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.span; __VLS_intrinsicElements.span;
    __VLS_components.AIcon; __VLS_components.AIcon; __VLS_components.aIcon; __VLS_components.aIcon; __VLS_components["a-icon"]; __VLS_components["a-icon"];
    // @ts-ignore
    [AIcon, AIcon,];
    __VLS_components.GenalActive; __VLS_components.GenalActive; __VLS_components.GenalActive; __VLS_components.GenalActive; __VLS_components.genalActive; __VLS_components.genalActive; __VLS_components.genalActive; __VLS_components.genalActive; __VLS_components["genal-active"]; __VLS_components["genal-active"]; __VLS_components["genal-active"]; __VLS_components["genal-active"];
    // @ts-ignore
    [GenalActive, GenalActive, GenalActive, GenalActive,];
    __VLS_components.Transition; __VLS_components.Transition; __VLS_components.Transition; __VLS_components.Transition; __VLS_components.transition; __VLS_components.transition; __VLS_components.transition; __VLS_components.transition;
    // @ts-ignore
    [transition, transition, transition, transition,];
    __VLS_components.GenalAvatar; __VLS_components.GenalAvatar; __VLS_components.genalAvatar; __VLS_components.genalAvatar; __VLS_components["genal-avatar"]; __VLS_components["genal-avatar"];
    // @ts-ignore
    [GenalAvatar, GenalAvatar,];
    __VLS_intrinsicElements.a; __VLS_intrinsicElements.a;
    __VLS_components.Viewer; __VLS_components.Viewer; __VLS_components.viewer; __VLS_components.viewer;
    // @ts-ignore
    [viewer, viewer,];
    __VLS_intrinsicElements.img;
    __VLS_components.GenalInput; __VLS_components.GenalInput; __VLS_components.genalInput; __VLS_components.genalInput; __VLS_components["genal-input"]; __VLS_components["genal-input"];
    // @ts-ignore
    [GenalInput, GenalInput,];
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("message"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("message"), });
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
        let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
        {
            const __VLS_5 = __VLS_intrinsicElements["div"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, class: ("message-header"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("message-header"), });
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
            let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
            {
                const __VLS_10 = __VLS_intrinsicElements["div"];
                const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
                const __VLS_12 = __VLS_11({ ...{}, class: ("message-header-box"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("message-header-box"), });
                const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
                let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
                {
                    const __VLS_15 = __VLS_intrinsicElements["span"];
                    const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                    const __VLS_17 = __VLS_16({ ...{}, class: ("message-header-text"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("message-header-text"), });
                    const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
                    let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
                    (__VLS_ctx.chatName);
                    (__VLS_18.slots!).default;
                }
                if (__VLS_ctx.dropped) {
                    {
                        let __VLS_20!: 'AIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.AIcon : 'aIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.aIcon : 'a-icon' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['a-icon'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['AIcon'];
                        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, type: ("sync"), spin: (true), class: ("message-header-icon"), }));
                        ({} as { AIcon: typeof __VLS_20; }).AIcon;
                        const __VLS_22 = __VLS_21({ ...{}, type: ("sync"), spin: (true), class: ("message-header-icon"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, type: ("sync"), spin: (true), class: ("message-header-icon"), });
                        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
                        let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
                    }
                    // @ts-ignore
                    [chatName, dropped,];
                }
                if (__VLS_ctx.groupGather[__VLS_ctx.activeRoom.groupId]) {
                    {
                        let __VLS_25!: 'GenalActive' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.GenalActive : 'genalActive' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.genalActive : 'genal-active' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['genal-active'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['GenalActive'];
                        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({ ...{}, type: ("group"), }));
                        ({} as { GenalActive: typeof __VLS_25; }).GenalActive;
                        ({} as { GenalActive: typeof __VLS_25; }).GenalActive;
                        const __VLS_27 = __VLS_26({ ...{}, type: ("group"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, type: ("group"), });
                        const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
                        let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
                    }
                    // @ts-ignore
                    [groupGather, activeRoom,];
                }
                else {
                    {
                        let __VLS_30!: 'GenalActive' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.GenalActive : 'genalActive' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.genalActive : 'genal-active' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['genal-active'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['GenalActive'];
                        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{}, type: ("friend"), }));
                        ({} as { GenalActive: typeof __VLS_30; }).GenalActive;
                        ({} as { GenalActive: typeof __VLS_30; }).GenalActive;
                        const __VLS_32 = __VLS_31({ ...{}, type: ("friend"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, type: ("friend"), });
                        const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
                        let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
                    }
                }
                (__VLS_13.slots!).default;
            }
            (__VLS_8.slots!).default;
        }
        {
            let __VLS_35!: 'Transition' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.Transition : 'transition' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.transition : (typeof __VLS_resolvedLocalAndGlobalComponents)['transition'];
            const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ ...{}, name: ("loading"), }));
            ({} as { transition: typeof __VLS_35; }).transition;
            ({} as { transition: typeof __VLS_35; }).transition;
            const __VLS_37 = __VLS_36({ ...{}, name: ("loading"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, name: ("loading"), });
            const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
            let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
            if (__VLS_ctx.spinning && !__VLS_ctx.isNoData) {
                {
                    const __VLS_40 = __VLS_intrinsicElements["div"];
                    const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
                    const __VLS_42 = __VLS_41({ ...{}, class: ("message-loading"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{}, class: ("message-loading"), });
                    const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
                    let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
                    {
                        let __VLS_45!: 'AIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.AIcon : 'aIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.aIcon : 'a-icon' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['a-icon'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['AIcon'];
                        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({ ...{}, type: ("sync"), spin: (true), class: ("message-loading-icon"), }));
                        ({} as { AIcon: typeof __VLS_45; }).AIcon;
                        const __VLS_47 = __VLS_46({ ...{}, type: ("sync"), spin: (true), class: ("message-loading-icon"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_45, typeof __VLS_47> & Record<string, unknown>) => void)({ ...{}, type: ("sync"), spin: (true), class: ("message-loading-icon"), });
                        const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47)!;
                        let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>;
                    }
                    (__VLS_43.slots!).default;
                }
                // @ts-ignore
                [spinning, isNoData,];
            }
            (__VLS_38.slots!).default;
        }
        {
            const __VLS_50 = __VLS_intrinsicElements["div"];
            const __VLS_51 = __VLS_elementAsFunctionalComponent(__VLS_50);
            const __VLS_52 = __VLS_51({ ...{}, class: ("message-main"), style: (({ opacity: __VLS_ctx.messageOpacity })), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_50, typeof __VLS_52> & Record<string, unknown>) => void)({ ...{}, class: ("message-main"), style: (({ opacity: __VLS_ctx.messageOpacity })), });
            const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52)!;
            let __VLS_54!: __VLS_NormalizeEmits<typeof __VLS_53.emit>;
            {
                const __VLS_55 = __VLS_intrinsicElements["div"];
                const __VLS_56 = __VLS_elementAsFunctionalComponent(__VLS_55);
                const __VLS_57 = __VLS_56({ ...{}, class: ("message-content"), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
                ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_55, typeof __VLS_57> & Record<string, unknown>) => void)({ ...{}, class: ("message-content"), });
                const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57)!;
                let __VLS_59!: __VLS_NormalizeEmits<typeof __VLS_58.emit>;
                {
                    let __VLS_60!: 'Transition' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.Transition : 'transition' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.transition : (typeof __VLS_resolvedLocalAndGlobalComponents)['transition'];
                    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{}, name: ("noData"), }));
                    ({} as { transition: typeof __VLS_60; }).transition;
                    ({} as { transition: typeof __VLS_60; }).transition;
                    const __VLS_62 = __VLS_61({ ...{}, name: ("noData"), }, ...__VLS_functionalComponentArgsRest(__VLS_61));
                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_60, typeof __VLS_62> & Record<string, unknown>) => void)({ ...{}, name: ("noData"), });
                    const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62)!;
                    let __VLS_64!: __VLS_NormalizeEmits<typeof __VLS_63.emit>;
                    if (__VLS_ctx.isNoData) {
                        {
                            const __VLS_65 = __VLS_intrinsicElements["div"];
                            const __VLS_66 = __VLS_elementAsFunctionalComponent(__VLS_65);
                            const __VLS_67 = __VLS_66({ ...{}, class: ("message-content-noData"), }, ...__VLS_functionalComponentArgsRest(__VLS_66));
                            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_65, typeof __VLS_67> & Record<string, unknown>) => void)({ ...{}, class: ("message-content-noData"), });
                            const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_65, __VLS_67)!;
                            let __VLS_69!: __VLS_NormalizeEmits<typeof __VLS_68.emit>;
                            (__VLS_68.slots!).default;
                        }
                        // @ts-ignore
                        [messageOpacity, messageOpacity, isNoData,];
                    }
                    (__VLS_63.slots!).default;
                }
                for (const [item] of __VLS_getVForSourceType((__VLS_ctx.activeRoom.messages)!)) {
                    {
                        const __VLS_70 = __VLS_intrinsicElements["div"];
                        const __VLS_71 = __VLS_elementAsFunctionalComponent(__VLS_70);
                        const __VLS_72 = __VLS_71({ ...{}, class: ("message-content-message"), key: ((item.userId + item.time)), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_70, typeof __VLS_72> & Record<string, unknown>) => void)({ ...{}, class: ("message-content-message"), key: ((item.userId + item.time)), });
                        const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72)!;
                        let __VLS_74!: __VLS_NormalizeEmits<typeof __VLS_73.emit>;
                        ({ 'text-right': item.userId === __VLS_ctx.user.userId });
                        __VLS_styleScopedClasses = ({ 'text-right': item.userId === user.userId });
                        {
                            let __VLS_75!: 'GenalAvatar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.GenalAvatar : 'genalAvatar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.genalAvatar : 'genal-avatar' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['genal-avatar'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['GenalAvatar'];
                            const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ ...{}, data: ((item)), }));
                            ({} as { GenalAvatar: typeof __VLS_75; }).GenalAvatar;
                            ({} as { GenalAvatar: typeof __VLS_75; }).GenalAvatar;
                            const __VLS_77 = __VLS_76({ ...{}, data: ((item)), }, ...__VLS_functionalComponentArgsRest(__VLS_76));
                            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_75, typeof __VLS_77> & Record<string, unknown>) => void)({ ...{}, data: ((item)), });
                            const __VLS_78 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77)!;
                            let __VLS_79!: __VLS_NormalizeEmits<typeof __VLS_78.emit>;
                        }
                        {
                            const __VLS_80 = __VLS_intrinsicElements["div"];
                            const __VLS_81 = __VLS_elementAsFunctionalComponent(__VLS_80);
                            const __VLS_82 = __VLS_81({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_81));
                            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_80, typeof __VLS_82> & Record<string, unknown>) => void)({ ...{}, });
                            const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82)!;
                            let __VLS_84!: __VLS_NormalizeEmits<typeof __VLS_83.emit>;
                            if (__VLS_ctx._isUrl(item.content)) {
                                {
                                    const __VLS_85 = __VLS_intrinsicElements["a"];
                                    const __VLS_86 = __VLS_elementAsFunctionalComponent(__VLS_85);
                                    const __VLS_87 = __VLS_86({ ...{}, class: ("message-content-text"), href: ((item.content)), target: ("_blank"), }, ...__VLS_functionalComponentArgsRest(__VLS_86));
                                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_85, typeof __VLS_87> & Record<string, unknown>) => void)({ ...{}, class: ("message-content-text"), href: ((item.content)), target: ("_blank"), });
                                    const __VLS_88 = __VLS_pickFunctionalComponentCtx(__VLS_85, __VLS_87)!;
                                    let __VLS_89!: __VLS_NormalizeEmits<typeof __VLS_88.emit>;
                                    (item.content);
                                    (__VLS_88.slots!).default;
                                }
                                // @ts-ignore
                                [activeRoom, user, _isUrl,];
                            }
                            else if (item.messageType === 'text') {
                                {
                                    const __VLS_90 = __VLS_intrinsicElements["div"];
                                    const __VLS_91 = __VLS_elementAsFunctionalComponent(__VLS_90);
                                    const __VLS_92 = __VLS_91({ ...{}, class: ("message-content-text"), }, ...__VLS_functionalComponentArgsRest(__VLS_91));
                                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_90, typeof __VLS_92> & Record<string, unknown>) => void)({ ...{}, class: ("message-content-text"), });
                                    const __VLS_93 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92)!;
                                    let __VLS_94!: __VLS_NormalizeEmits<typeof __VLS_93.emit>;
                                    __VLS_directiveFunction(__VLS_ctx.vText)((__VLS_ctx._parseText(item.content)));
                                }
                                // @ts-ignore
                                [_parseText,];
                            }
                            if (item.messageType === 'image') {
                                {
                                    const __VLS_95 = __VLS_intrinsicElements["div"];
                                    const __VLS_96 = __VLS_elementAsFunctionalComponent(__VLS_95);
                                    const __VLS_97 = __VLS_96({ ...{}, class: ("message-content-image"), style: ((__VLS_ctx.getImageStyle(item.content))), }, ...__VLS_functionalComponentArgsRest(__VLS_96));
                                    ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_95, typeof __VLS_97> & Record<string, unknown>) => void)({ ...{}, class: ("message-content-image"), style: ((__VLS_ctx.getImageStyle(item.content))), });
                                    const __VLS_98 = __VLS_pickFunctionalComponentCtx(__VLS_95, __VLS_97)!;
                                    let __VLS_99!: __VLS_NormalizeEmits<typeof __VLS_98.emit>;
                                    {
                                        let __VLS_100!: 'Viewer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.Viewer : 'viewer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.viewer : (typeof __VLS_resolvedLocalAndGlobalComponents)['viewer'];
                                        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({ ...{}, style: ({}), }));
                                        ({} as { viewer: typeof __VLS_100; }).viewer;
                                        ({} as { viewer: typeof __VLS_100; }).viewer;
                                        const __VLS_102 = __VLS_101({ ...{}, style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_101));
                                        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_100, typeof __VLS_102> & Record<string, unknown>) => void)({ ...{}, style: ({}), });
                                        const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102)!;
                                        let __VLS_104!: __VLS_NormalizeEmits<typeof __VLS_103.emit>;
                                        {
                                            const __VLS_105 = __VLS_intrinsicElements["img"];
                                            const __VLS_106 = __VLS_elementAsFunctionalComponent(__VLS_105);
                                            const __VLS_107 = __VLS_106({ ...{}, src: (('api/static/' + item.content)), alt: (""), }, ...__VLS_functionalComponentArgsRest(__VLS_106));
                                            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_105, typeof __VLS_107> & Record<string, unknown>) => void)({ ...{}, src: (('api/static/' + item.content)), alt: (""), });
                                            const __VLS_108 = __VLS_pickFunctionalComponentCtx(__VLS_105, __VLS_107)!;
                                            let __VLS_109!: __VLS_NormalizeEmits<typeof __VLS_108.emit>;
                                        }
                                        (__VLS_103.slots!).default;
                                    }
                                    (__VLS_98.slots!).default;
                                }
                                // @ts-ignore
                                [getImageStyle, getImageStyle,];
                            }
                            (__VLS_83.slots!).default;
                        }
                        (__VLS_73.slots!).default;
                    }
                }
                (__VLS_58.slots!).default;
            }
            (__VLS_53.slots!).default;
        }
        {
            let __VLS_110!: 'GenalInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.GenalInput : 'genalInput' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.genalInput : 'genal-input' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['genal-input'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['GenalInput'];
            const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({ ...{}, }));
            ({} as { GenalInput: typeof __VLS_110; }).GenalInput;
            ({} as { GenalInput: typeof __VLS_110; }).GenalInput;
            const __VLS_112 = __VLS_111({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_111));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_110, typeof __VLS_112> & Record<string, unknown>) => void)({ ...{}, });
            const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112)!;
            let __VLS_114!: __VLS_NormalizeEmits<typeof __VLS_113.emit>;
        }
        (__VLS_3.slots!).default;
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["message"];
        __VLS_styleScopedClasses["message-header"];
        __VLS_styleScopedClasses["message-header-box"];
        __VLS_styleScopedClasses["message-header-text"];
        __VLS_styleScopedClasses["message-header-icon"];
        __VLS_styleScopedClasses["message-loading"];
        __VLS_styleScopedClasses["message-loading-icon"];
        __VLS_styleScopedClasses["message-main"];
        __VLS_styleScopedClasses["message-content"];
        __VLS_styleScopedClasses["message-content-noData"];
        __VLS_styleScopedClasses["message-content-message"];
        __VLS_styleScopedClasses["message-content-text"];
        __VLS_styleScopedClasses["message-content-text"];
        __VLS_styleScopedClasses["message-content-image"];
    }
    var __VLS_slots!: {};
    return __VLS_slots;
}
