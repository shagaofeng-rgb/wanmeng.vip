export type Product={slug:string;name:string;category:string;scene:string;tags:string[];images:string[];color:string};
const imgs=(...n:number[])=>n.map(i=>`/images/products/product-${String(i).padStart(2,'0')}.jpg`);
export const products:Product[]=[
 {slug:'m7-beige',name:'轻眠·M7 米色床帘',category:'宿舍床帘',scene:'适合希望空间更柔和、安静的住校生活',tags:['柔和遮光','通风','免打孔'],images:imgs(1,2,3,4),color:'奶油米'},
 {slug:'m8-beige',name:'晚安·M8 米色床帘',category:'宿舍床帘',scene:'适合需要更私密睡眠空间的上铺同学',tags:['稳定遮光','保护隐私','易安装'],images:imgs(5,6,7,8),color:'暖米色'},
 {slug:'h3-blue-pink',name:'微风·H3 蓝粉床帘',category:'宿舍床帘',scene:'适合喜欢清爽配色与轻盈空间的宿舍',tags:['清新配色','透气','易打理'],images:imgs(9,10,11,12),color:'雾蓝粉'},
 {slug:'m7-blue',name:'静夜·M7 蓝色床帘',category:'遮光床帘',scene:'适合晚睡室友较多、需要减少光线干扰的床位',tags:['深色遮光','隐私','耐看'],images:imgs(13,14,2,6),color:'静夜蓝'},
 {slug:'mosquito-set',name:'夏日·蚊帐一体床帘',category:'蚊帐一体',scene:'兼顾防蚊与隐私的夏季宿舍方案',tags:['防蚊','双层开合','通风'],images:imgs(3,7,11,14),color:'奶油白'},
 {slug:'starter-set',name:'新生·宿舍三件套',category:'宿舍套装',scene:'为第一次住校准备的基础睡眠组合',tags:['床帘','床垫','枕头'],images:imgs(4,8,10,13),color:'自然米'},
];
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug);
