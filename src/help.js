export default {
    medias: {
        'purchase': { media: 'purchase/purchase.png', title: '求购竞标'},
        'guarantee': { media: '/purchase/purchase-guarantee.png', title: '什么是保证金'},
        'personal_level': { media: 'user/personal_level.png', title: '等级介绍'},
        'instruction': { media: 'shop/instruction.png', title: '店铺违规说明和处罚措施'},
        'guide_1': { media: 'shop/guide/1.png?v2', title: '内容详情' },
        'guide_2': { media: 'shop/guide/2.png?v2', title: '内容详情' },
        'guide_3': { media: 'shop/guide/3.png?v2', title: '内容详情' },
        'guide_4': { media: 'shop/guide/4.png?v2', title: '内容详情' },
        'guide_5': { media: 'shop/guide/5.png?v2', title: '内容详情' },
        'guide_6': { media: 'shop/guide/6.png?v2', title: '内容详情' },
        'guide_7': { media: 'shop/guide/7.png?v2', title: '内容详情' },
        'guide_8': { media: 'shop/guide/8.png?v2', title: '内容详情' }
    },
    desc: {
        'jade_problem': {
            items: [
                {
                    title: '担保交易',
                    content: '顾客付款后，所付钱款由美玉秀秀平台暂时保管，顾客收到商品后，点击确认收货，且在签收之日起3日内没有申请退货，钱款才会转移给商家。'
                }, {
                    title: '物流和验货',
                    content: '1. 商品的配送由商家负责，物流统一为顺丰速运并且保价运输。\n2. 顾客收到商品后，请务必当面验货，检查所购商品有无破损，是否和平台描述一致，如商品有严重破损或其他明显质量问题，请拍照记录并拒绝签收。'
                }, {
                    title: '3天退货',
                    content: '1. 自签收之日起3日内，商品无损坏且不影响二次销售的，商家承诺为顾客退货。\n2. 请您在退货时务必使用顺丰速运，并且选择保价的方式配送。\n3. 关于保价的金额和退货运费的支付方式，请您务必与商家协商沟通，达成一致，如果您没有与商家协商，默认的处理方案如下:\n'+
                    '1）退货的运费及保价费由您承担，请不要使用到付的形式退货。\n2）商家发货的运费及保价费由商家承担，您无需支付这笔费用。\n3）如果双方就退货以及退货导致的运费和保价费未能达成一致，由平台协商仲裁解决。'
                }
            ]
        },
        'identity': {
            items: [
                {
                    title: '身份认证',
                    content: '对用户账号信息的真实性进行审核后，会在账号主页以及用户名旁边带上的认证标识'
                }, {
                    title: '对象',
                    content: '1. 工作室负责人\n2. 商铺负责人\n3. 有正规资质的组织机构'
                }, {
                    title: '如何申请认证？',
                    content: '美玉秀秀管理委员会采用邀请制的方式对以上类别用户进行认证。身份认证必须经过实名认证'
                }, {
                    title: '认证的账号是否会拥有额外权限',
                    content: '对账号的认证仅意味着美玉秀秀已对用户提交的资料和信息进行了合理、谨慎的形式审查和核实。认证本身不包含差异化的用户权限或权益'
                }, {
                    title: '什么情况下会取消认证？',
                    content: '身份、资质不实，包括夸大或伪造、认证信息过期或失效，美玉秀秀会取消认证'
                }
            ]
        },
        'author': {
            items: [
                {
                    title: '精华内容作者',
                    content: '精华内容作者是指活跃在美玉秀秀的一批高质量原创内容贡献者，他们无私、积极地分享自己的知识、经验和见解，为玉友提供眼界、鉴赏、知识相关的优质内容'
                }, {
                    title: '勋章获取条件',
                    content: '在美玉秀秀发布10篇以上视频或长图文精华帖\n精华帖：获赞数超过100、浏览数超过10000、点赞率超过15%'
                }, {
                    title: '如何申请认证？',
                    content: '1. 美玉秀秀管理委员会采用邀请制的方式对以上类别用户进行认证\n2. 满足认证对象的情况下，用户可通过联系客服主动申请认证'
                }
            ]
        },
        'recognition': {
            title: '认同度',
            items: [
                {
                    title: '认同度是什么？',
                    content: '认同度代表着视频回答受观看用户的认可程度，认同度每周更新一次，数值变化基于用户上周发布的视频回答的播放量、用户认同数量、播放时长、分享数量、评论数量、收藏数量综合计算得出'
                }, {
                    title: '认同度有什么作用？',
                    content: '一方面认同度代表了用户对视频回答的认可程度，另一方面认同度影响获取鉴宝值的速度，根据认同度的不同鉴宝值增速也不同'
                }, {
                    title: '如何提升认同度？',
                    content: '1. 发布高质量视频回答，提升用户播放时长和认同度\n2. 积极回复评论'
                }
            ]
        },
        'coupon': {
            items: [
                {
                    title: '如何使用优惠券',
                    content: '下单后，系统会自动选取满足条件的优惠券进行减额'
                }, {
                    title: '使用规则',
                    content: '1. 首单券：首次下单即可使用 \n2. 满减券：下单时金额满足满减条件后即可使用\n'+
                        '3. 同一个订单同一类优惠券最多只能使用一张\n4. 取消订单时，自动退回对应的优惠券\n'+
                        '5. 拒收或退货时，不退回对应的优惠券\n6. 优惠券必须在其有效期内使用。建议打开美玉秀秀APP消息推送，及时接收优惠券过期提醒'
                }
            ]
        },
        'mall_common': {
            title: '常见问题',
            type: 'mall_common',
            items: [
                {
                    id: 'common_1',
                    title: '担保交易如何保障资金安全？',
                    content: '买家支付的钱款由美玉秀秀受银行监管的账户代管，买家确认收货且最终交易完成之后，钱款才会转移到卖家账户\n交易流程为：\n确认购买信息→买家付款到美玉秀秀平台→卖家发货→买家收货无问题→鉴赏期→美玉秀秀付款给卖家→交易完成'
                }, {
                    id: 'common_2',
                    title: '退货期从什么时候开始计算？',
                    content: '退货期从订单状态变更为确认签收后开始计算，确认签收有两种方式：\n1. 买家收到货物后，手动点击确认签收\n2. 美玉秀秀和各大快递公司进行了深入合作，当订单物流信息显示［已签收］后的36小时，订单状态会自动变为确认签收'
                }, {
                    id: 'common_3',
                    title: '发货和退货运费谁来承担？',
                    content: '如双方没有特殊约定：\n1. 发货运费由卖家承担，超过2000元的商品建议采用保价运输\n2. 退货运费由买家承担，需采用和卖家发货相同快递公司和保价方式运输\n如双方有特殊约定，按照双方协商约定进行'
                }, {
                    id: 'common_4',
                    title: '付款了，商家不发货怎么办？',
                    content: '1. 付款后，超过24小时卖家还未发货，且无法联系到卖家时，请您及时联系客服处理\n2. 付款后，卖家因缺货、价格变动等其它原因导致无法发货，您可以在订单状态中申请退款；同时，请您联系客服说明情况，客服核实后会对卖家进行违规操作处理'
                }, {
                    id: 'common_5',
                    title: '交易中发生纠纷怎么办？',
                    content: '在选购、付款以及售后过程中产生的任何纠纷，您都可以联系客服说明情况，客服会根据双方的交易记录和信息对纠纷进行仲裁处理'
                }, {
                    id: 'common_6',
                    title: '如何退货？',
                    content: '1. 快递已签收后，如果买家不满意，可以在订单状态变更为［已签收］的3天内提出退货申请\n2. 在订单状态中，点击［申请退货］，填写原因、上传凭证并提交申请\n3. 卖家会在24小时内对退货申请进行处理，如果卖家同意退货申请，您需要将商品按照原包装（包括赠品）寄回，寄回需使用发货的快递公司以及保价，退货产生的运费、保价费由买家本人支付\n4. 如果卖家24小时内未对退货进行处理，或拒绝退货，客服将进行交易仲裁'
                }, {
                    id: 'common_7',
                    title: '退款多久可以到账？',
                    content: '未发货直接退款：1个工作日内钱款会退换至原支付账户\n退货退款：买家寄回退货商品，卖家收到商品后点击确认收货之后的1个工作日内，钱款会退换至买家原支付账户'
                }, {
                    id: 'common_8',
                    title: '商家不同意退货（退款）怎么办？',
                    content: '如果卖家24小时内未对退货（退款）申请进行处理，或拒绝退货（退款），请您联系客服，客服将进行交易仲裁'
                }, {
                    id: 'common_9',
                    title: '可以申请延长退货期吗？',
                    content: '您可以与卖家进行协商，卖家同意后由卖家发起延长退货期。'
                }, {
                    id: 'common_10',
                    title: '私下会有什么风险？平台保障吗？',
                    content: '私下交易已经超过平台保障范围，可能产生的交易纠纷和资金风险平台不做保障，一切风险将有本人承担。'
                }
            ]
        },
        'mall_customer': {
            title: '售后问题',
            type: 'mall_customer',
            items: [
                {
                    id: 'customer_1',
                    title: '3天退货期从什么时候开始计算？',
                    content: '退货期从订单状态变更为确认签收后开始计算，确认签收有两种方式：\n1. 买家收到货物后，手动点击确认签收\n2. 美玉秀秀和各大快递公司进行了深入合作，当订单物流信息显示［已签收］后的36小时，订单状态会自动变为确认签收'
                }, {
                    id: 'customer_2',
                    title: '退货期过了还能退货吗？',
                    content: '在美玉秀秀平台内，超过退货期的订单和商品无法发起退货'
                }, {
                    id: 'customer_3',
                    title: '卖家不同意退货（退款）怎么办？',
                    content: '如果卖家24小时内未对退货进行处理，或拒绝退货，请联系客服，客服将进行交易仲裁'
                }, {
                    id: 'customer_4',
                    title: '卖家同意退货，我怎么将商品寄回去？',
                    content: '1. 请联系卖家获取退货地址，无法联系到卖家请联系客服处理\n2. 获取退货地址后，您需要将商品按照原包装（包括赠品）寄回，寄回需使用发货的快递公司以及保价，退货产生的运费、保价费由买家本人支付'
                }, {
                    id: 'customer_5',
                    title: '退货用哪家快递公司退回商品？',
                    content: '买家需采用和卖家相同的快递公司和保价方式退货'
                }, {
                    id: 'customer_6',
                    title: '退货的运费和保价费谁出？',
                    content: '退货时，默认买家支付退货快递费用，买家需采用和卖家相同的快递公司和保价方式退货'
                }, {
                    id: 'customer_7',
                    title: '退款多久到账？',
                    content: '未发货直接退款：1个工作日内钱款会退换至原支付账户\n退货退款：买家寄回退货商品，卖家收到商品后点击确认收货，1个工作日内钱款会退换至原支付账户'
                }
            ]
        },
        'mall_logistics': {
            title: '物流问题',
            type: 'mall_logistics',
            items: [
                {
                    id: 'logistics_1',
                    title: '发货用哪家快递公司发货？',
                    content: '1. 在顺丰可达的地区，卖家默认使用顺丰\n2. 顺丰无法到达的地区可协商选择其它快递方式'
                }, {
                    id: 'logistics_2',
                    title: '发货运费和保价费谁出？',
                    content: '1. 无特殊约定，默认卖家支付发货运费，卖家不可在没有和买家沟通的情况下私自选择到付方式\n2. 如双方有协商，按照协商约定进行'
                }, {
                    id: 'logistics_3',
                    title: '为什么查询不到物流信息？',
                    content: '1. 物流公司信息显示有一定延迟，请在订单状态变更后3小时再查询物流信息\n2. 如果物流信息依然无法查询，卖家（买家）有可能填写了错误的物流单号，您可以联系对方核实或联系客服处理'
                }, {
                    id: 'logistics_4',
                    title: '物流显示已签收，但并没有收到商品怎么办？',
                    content: '请您立即联系物流公司对货物进行跟踪，同时联系客服，核实后客服会对订单进行重点保护，保障您的资金和商品安全'
                }, {
                    id: 'logistics_5',
                    title: '没收到商品，误点击了确认签收怎么处理？',
                    content: '1. 您可以和卖家进行沟通，说明情况后，卖家可根据预计到货时间延长退货期\n2. 联系客服进行处理'
                }
            ]
        },
        'shop_level': {
            items: [
                {
                    title: '如何赚取积分？',
                    content: '商品销售&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;+（商品价格/40）\n'+
                    '好评&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;+10分\n'+
                    '中评&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;+1分\n'+
                    '差评&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-10分\n'+
                    '参与求购竞标&emsp;&emsp;&emsp;&emsp;&emsp;+1分\n'+
                    '商品审核通过&emsp;&emsp;&emsp;&emsp;&emsp;+5分\n'
                }, {
                    title: '店铺等级有什么用？',
                    content: '店铺等级将展示在店铺的显眼位置，是买家选择店铺的重要参考标准。\n店铺等级越高，在搜索、推荐、专题中的排名越靠前，同时享受美玉秀秀平台专属推广。'
                }, {
                    title: '如何提高店铺等级？',
                    content: '通过销售商品、获取评价以及其他行为获得积分，不同的积分对应相应的等级。'
                }
            ]
        },
        'shop_promise': {
            items: [
                {
                    title: '店铺服务承诺',
                    content: '店铺服务承诺是美玉秀秀退出的旨在提升平台交易中消费者合法权益和体验的服务体系。\n“三天无条件退货”，为加入店铺服务承诺的必选项。\n“烟标图”、“自然光拍摄”等都是其中的服务之一，由卖家自行选择加入。'
                }, {
                    title: '加入“店铺服务承诺”的优势有：',
                    content: '1、在您的商品上加上特殊标记，并有独立的筛选功能，让您商品可以马上被买家找到；\n2、拥有相关服务标记的商品，可信度高，买家更容易接受；\n3、为提高交易质量，部分活动只针对加入保障计划的店铺和商品开放'
                }, {
                    title: '服务规范',
                    content: '对于已经加入“店铺服务承诺”的卖家，在平台内的行为需按照服务要求，平台会采用定期抽检、用户举报反馈等方式对加入承诺服务的卖家进行后续跟踪，若发现卖家进行未按照服务规则指示，将采取的措施有：\n1、下架、删除不符合规范的商品\n2、减扣店铺积分\n3、对店铺实施搜索屏蔽\n4、关停店铺'
                }
            ]
        },
        'shop_smoke': {
            btn: true, // 是否在说明页面显示按钮
            title: '烟标图',
            items: [
                {
                    title: '烟标图须知',
                    content: '1、请在室内或室外自然光源下拍摄烟标图\n2、请把所拍摄物品与烟标并列摆放，在自然光源的环境下，对焦于烟标（对焦后，可见烟标细节）\n3、请勿在黑色背景下拍摄'
                }, {
                    title: '说明',
                    content: '在商品发布过程中，允许给符合烟标图要求的商品增加 [烟标图] 标记，一个商品必须包含1张或1张以上烟标图。'
                }, {
                    title: '优势',
                    content: '标记为[烟标图]的商品会获得优先曝光，同时在商城中会有特殊标记展示。'
                }, {
                    title: '审核',
                    content: '审核人员会对您之前发布的商品进行审核，要求：\n1、总商品数量超过30\n2、包含烟标图拍摄的商品数量需占总商品数量的50%以上\n您可以在商品管理中对之前发布的商品进行编辑修改，补充上传烟标图。'
                }
            ]
        },
        'shop_sun': {
            btn: true,
            title: '自然光拍摄',
            items: [
                {
                    title: '自然光源定义',
                    content: '1. 室内自然光测光拍摄，要求对焦准确清晰，图片放大后，细节可见\n2. 室外自然光测光拍摄，要求对焦准确清晰，图片放大后，细节可见\n3. 无任何人为提亮、提白效果\n4. 请勿在黑色背景下拍摄'
                }, {
                    title: '说明',
                    content: '在商品发布过程中，允许给符合自然光拍摄要求的商品增加 [自然光拍摄] 标记，一个商品必须包含2张或2张以上自然光拍摄图片。'
                }, {
                    title: '优势',
                    content: '标记为 [自然光拍摄] 的商品会获得优先曝光，同时在商城中会有特殊标记展示。'
                }, {
                    title: '权限审核',
                    content: '开通此标记，审核人员会对您之前发布的商品进行审核，要求：\n1. 总商品数量超过30\n2. 包含自然光拍摄的商品数量需占总商品数量的50%以上\n您可以在商品管理中对之前发布的商品进行编辑修改，补充上传自然光拍摄图片。'
                }
            ]
        },
        'shop_return': {
            btn: true,
            title: '三天无理由退货',
            items: [
                { title: '任何入驻美玉秀秀的店铺必须遵守 [三天无理由退货] 基本服务。' },
                {
                    title: '三天无理由退货从什么时候开始计算？',
                    content: '从订单状态变更为确认签收后开始计算，确认签收有两种方式：\n1. 买家收到货物后，手动点击确认签收\n2. 美玉秀秀和各大快递公司进行了深入合作，当订单物流信息显示 [已签收] 后的36小时，买家依然没有点击确认签收，订单状态会自动变为确认签收'
                }, {
                    title: '退货运费和保价费由谁承担？',
                    content: '平台默认退货运费和保价费由买家承担，如双方有特殊约定，按照双方协商约定进行。'
                }, {
                    title: '退货买家需要支付发货的运费和保价费吗？',
                    content: '不用。'
                }
            ]
        }
    }
}