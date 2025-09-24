import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCurrent, fetchUserLogin, fetchUserVerify } from "@/pages/api";
import toast from "react-hot-toast";
import Logo from "@/cs-components/logo";
import { useRouter } from "next/navigation";
import Spinner from "@/cs-components/spinner";
import CustomToast from "@/cs-components/custom-toast";
import Countdown, { zeroPad } from 'react-countdown';
import { Edit } from "lucide-react";
import Link from "next/link";


export default function Account() {


  const dispatch = useDispatch()
  const [form, setForm] = useState("login")
  const [mobile, setMobile] = useState("login")
  const [submitted, setSubmitted] = useState(false)
  const [expiredAt, setExpiredAt] = useState()
  const [verifySubmitted, setVerifySubmitted] = useState(false)
  const [resendCode, setResendCode] = useState(false)
  const users = useSelector(state => state.users)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchUserCurrent())
  }, [])

  const login = (event) => {
    event.preventDefault();
    let newwindow = window.open("http://localhost:8000/google-services/redirect", "google-oauth", 'height=500,width=500');
    if (window.focus) { newwindow.focus() }
    return false;
  }

  useEffect(() => {

    window.addEventListener("message", function (event) {
      if (typeof (event.data) === "string") {
        toast.custom((t) => <CustomToast action="success" message="ورود شما موفقیت آمیز بود" />)
        localStorage.setItem("_token_", event.data)
        router.push("/dashboard")
      }
    });

  }, [])

  const loginFormik = useFormik({
    initialValues: {
      mobile: ""
    },
    onSubmit: (values) => {
      dispatch(fetchUserLogin(values))
      setMobile(values.mobile)
      setSubmitted(true)
    }
  })


  const verifyFormik = useFormik({
    initialValues: {
      code: ""
    },
    onSubmit: (values) => {
      dispatch(fetchUserVerify(values))
      setVerifySubmitted(true)
    }
  })

  if (users.error && submitted) {
    toast.error(users.message)
    setSubmitted(false)
  }

  if (users.data && users.data.length > 0 && submitted) {

    let countdownTimer = Date.now() + 180000

    setExpiredAt(countdownTimer)
    setForm("verify")
    setSubmitted(false)
  }

  const handleResendCode = () => {
    dispatch(fetchUserLogin({
      mobile
    }))
    setResendCode(false)
    setExpiredAt(Date.now() + 180000)
  }

  if (users.verifyError && verifySubmitted) {
    toast.error(users.message)
    setVerifySubmitted(false)
  }

  if (users.verifyData.length > 0 && verifySubmitted) {
    setVerifySubmitted(false)
    localStorage.setItem("_token_", users.verifyData[0].token)
    router.push("/dashboard")
  }

  if (users.currentError == undefined) {
    return <Spinner />
  }

  if (!users.currentError) {
    return router.push("/dashboard")
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setResendCode(true)
    } else {
      // Render a countdown
      return <div className="flex items-center justify-center text-stone-400 gap-2">
        <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        <span className="text-sm">مانده تا دریافت مجدد کد</span>
      </div>
    }
  };

  console.log(expiredAt)

  return <div className=" flex items-center justify-center  min-h-screen">
    <div className={`relative   max-w-[450px] border shadow-lg rounded-lg py-8 mx-auto`}>

      {form == "login" && <form onSubmit={loginFormik.handleSubmit} className="flex  flex-col space-y-10 px-2">
        <Logo />
        <div className="grid gap-5 px-5">
          <h1 className="text-xl font-bold">ورود | ثبت‌نام</h1>
          <label className=" text-stone-400 font-normal">لطفا شماره موبایل خود را وارد نمایید</label>
          <Input onChange={loginFormik.handleChange} id="mobile" className="text-center py-5" type="text" />
          <p className="text-sm text-stone-400">ورود شما به معنای پذیرش  شرایط <span className="text-sky-500 font-extrabold">فلوچین</span> و <span className="text-sky-500 font-extrabold">قوانین حریم‌‌خصوصی</span> است</p>
          <Button disabled={users.isLoading} type="submit" className="w-full bg-gradient dark:text-white py-6 text-base  hover:cursor-pointer">
            دریافت کد
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-white  text-stone-400 relative z-10 px-2">یا</span>
          </div>
          <Button asChild className=" cursor-pointer" variant="outline">
            <div onClick={(e) => login(e)} >
              <svg className="size-6" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"></path><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"></path><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"></path><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"></path><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path></g></svg>
              <span> ورود با حساب گوگول</span>
            </div>
          </Button>
        </div>
      </form>}



      {form == "verify" && <form onSubmit={verifyFormik.handleSubmit} className="flex  flex-col space-y-10 ">
        <Logo />
        <div className="grid gap-5 px-5">
          <h1 className="text-xl font-bold">کد تایید را وارد کنید</h1>
          <div className="flex  text-stone-400  items-center justify-between">
            <label className=" text-sm  font-normal ">کد تایید برای شماره {mobile} پیامک شد</label>
            <Edit onClick={() => {
              setForm("login")
            }} className=" cursor-pointer" size={16} />
          </div>
          <InputOTP onChange={(value) => verifyFormik.setFieldValue("code", value)} maxLength={5} containerClassName="ltr" >
            <InputOTPGroup className="grid grid-cols-5 gap-4 mx-auto">
              <InputOTPSlot index={0} className="rounded-md border-l py-5 px-8 text-base" />
              <InputOTPSlot index={1} className="rounded-md border-l py-5 px-8 text-base" />
              <InputOTPSlot index={2} className="rounded-md border-l py-5 px-8 text-base" />
              <InputOTPSlot index={3} className="rounded-md border-l py-5 px-8 text-base" />
              <InputOTPSlot index={4} className="rounded-md border-l py-5 px-8 text-base" />
            </InputOTPGroup>
          </InputOTP>
          {expiredAt && !resendCode && <Countdown renderer={renderer} date={expiredAt} />}
          {resendCode && <span onClick={handleResendCode} className=" cursor-pointer hover:text-blue-600  text-sky-500 p-2">ارسال مجدد کد</span>}
          <Button type="submit" className="w-full bg-gradient dark:text-white py-6 text-base  hover:cursor-pointer">
            تایید
          </Button>
        </div>
      </form>}
    </div>
  </div>


}
