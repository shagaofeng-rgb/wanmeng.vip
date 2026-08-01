import './globals.css';import {Header,Footer,FloatingActions} from '@/components/Site';
export const metadata={title:{default:'挽梦家纺｜为住校生活留一方安心',template:'%s｜挽梦家纺'},description:'大学宿舍床帘、蚊帐一体床帘与宿舍睡眠用品。懂宿舍里的小困扰，也认真对待每一个好梦。'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body><Header/><main>{children}</main><Footer/><FloatingActions/></body></html>}
