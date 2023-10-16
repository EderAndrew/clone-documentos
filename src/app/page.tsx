import { FormLogin } from "@/components/form_login"
import Image from "next/image"
import banner from '../../public/images/banner.jpg'

const Login = () => {
  return(
    <section className="flex flex-col md:flex-row items-center justify-center w-screen h-screen md:px-8">
        <div className="flex items-center justify-center md:w-full">
          <FormLogin />
        </div>
        <div className="fixed invisible md:relative md:visible lg:visible w-full justify-end m-4">
          <Image src={banner} alt="banner" width={800} height={300}/>
        </div>      
    </section>
  )
}
//#333b8f
export default Login