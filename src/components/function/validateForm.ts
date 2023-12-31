import { dataSingUp, dataSingUpErr } from "../../types/authType";
import { FormDataP0, FormDataP1Type, FromP0Err, FromP1Err, messageSubmitP0 } from "../../types/pageType";
import { compareTimes, currentDateAge } from "./function";
import { dataFromP0Err, dataFromP1Err, dataFromSingUpErr } from "./initialDataFrom";

// check value SingUp
export const checkValueSignUp = (data: dataSingUp): dataSingUpErr => {

    let valCheckData: dataSingUpErr = dataFromSingUpErr;
    // value fName
    const fNameVal: string = data.m_fname;
    if (fNameVal.length < 1 || fNameVal.length > 60) {
        valCheckData.m_fnameTxt = 'ระบุ Name ระหว่าง 1 - 60 ตัวอักษร';
        valCheckData.m_fnameStatus = true;
    } else {
        valCheckData.m_fnameTxt = '';
        valCheckData.m_fnameStatus = false;
    }

    // value LName
    const LNameVal: string = data.m_fname;
    if (LNameVal.length < 1 && LNameVal.length > 60) {
        valCheckData.m_lnameTxt = 'ระบุ Surname ระหว่าง 1 - 60 ตัวอักษร';
        valCheckData.m_lnameStatus = true;
    } else {
        valCheckData.m_lnameTxt = '';
        valCheckData.m_lnameStatus = false;
    }

    // value Username
    const userNameVal: string = data.m_username;
    if (userNameVal.length < 1 && userNameVal.length > 100) {
        valCheckData.m_usernameTxt = 'ระบุ Username ระหว่าง 1 - 100 ตัวอักษร';
        valCheckData.m_usernameStatus = true;
    } else {
        valCheckData.m_usernameTxt = '';
        valCheckData.m_usernameStatus = false;
    }

    // value Password
    const passWordVal: string = data.m_password;
    if (passWordVal.length < 6) {
        valCheckData.m_passwordTxt = 'ระบุ Password มากกว่า 6 ตัวอักษร';
        valCheckData.m_passwordStatus = true;
    } else if (passWordVal.length > 40) {
        valCheckData.m_passwordTxt = 'ระบุ Password ระหว่าง 1 - 40 ตัวอักษร';
        valCheckData.m_passwordStatus = true;
    } else {
        valCheckData.m_passwordTxt = '';
        valCheckData.m_passwordStatus = false;
    }

    // value idCard
    const idCardVal: string = data.m_idcard;
    if (idCardVal.length !== 13) {
        valCheckData.m_idcardTxt = 'ระบุ idCard 13 ตัวอักษรเท่านั้น';
        valCheckData.m_idcardStatus = true;
    } else {
        valCheckData.m_idcardTxt = '';
        valCheckData.m_idcardStatus = false;
    }

    // value phone
    const phoneVal: string = data.m_phone;
    if (phoneVal.length !== 10) {
        valCheckData.m_phoneTxt = 'ระบุ Phone 10 ตัวอักษรเท่านั้น';
        valCheckData.m_phoneStatus = true;
    } else {
        valCheckData.m_phoneTxt = '';
        valCheckData.m_phoneStatus = false;
    }

    // value email
    const emailVal: string = data.m_email;
    const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailVal.length < 1 || emailVal.length > 60 || !emailPattern.test(emailVal)) {
        valCheckData.m_emailTxt = 'ระบุ Email ไม่ถูกต้องหรือระหว่าง 1 - 60 ตัวอักษร';
        valCheckData.m_emailStatus = true;
    } else {
        valCheckData.m_emailTxt = '';
        valCheckData.m_emailStatus = false;
    }

    return valCheckData;
}
// validateForm
export const validateForm = (formDataSingUp: dataSingUp): dataSingUpErr => {
    const newFormErr: dataSingUpErr = { ...dataFromSingUpErr };

    // value fname
    const nameVal: string = formDataSingUp.m_fname;
    if (nameVal.length < 1 || nameVal.length > 60) {
        newFormErr.m_fnameStatus = true;
        newFormErr.m_fnameTxt = 'ระบุ Name ระหว่าง 1 - 60 ตัวอักษร';
    } else {
        newFormErr.m_fnameStatus = false;
        newFormErr.m_fnameTxt = '';
    }

    // value lname
    const lnameVal: string = formDataSingUp.m_lname;
    if (lnameVal.length < 1 || lnameVal.length > 60) {
        newFormErr.m_lnameStatus = true;
        newFormErr.m_lnameTxt = 'ระบุ Surname ระหว่าง 1 - 60 ตัวอักษร';
    } else {
        newFormErr.m_lnameStatus = false;
        newFormErr.m_lnameTxt = '';
    }

    // value username
    const userNameVal: string = formDataSingUp.m_username;
    if (userNameVal.length < 1 && userNameVal.length > 100) {
        newFormErr.m_usernameStatus = true;
        newFormErr.m_usernameTxt = 'ระบุ Username ระหว่าง 1 - 100 ตัวอักษร';
    } else {
        newFormErr.m_usernameStatus = false;
        newFormErr.m_usernameTxt = '';
    }

    // value Password
    const passWordVal: string = formDataSingUp.m_password;
    if (passWordVal.length < 6) {
        newFormErr.m_passwordTxt = 'ระบุ Password มากกว่า 6 ตัวอักษร';
        newFormErr.m_passwordStatus = true;
    } else if (passWordVal.length > 40) {
        newFormErr.m_passwordTxt = 'ระบุ Password ระหว่าง 1 - 40 ตัวอักษร';
        newFormErr.m_passwordStatus = true;
    } else {
        newFormErr.m_passwordTxt = '';
        newFormErr.m_passwordStatus = false;
    }

    // value idCard
    const idCardVal: string = formDataSingUp.m_idcard;
    if (!/^[0-9]{13}$/.test(idCardVal)) {
        newFormErr.m_idcardTxt = 'ระบุ idCard 13 ตัวเลขเท่านั้น';
        newFormErr.m_idcardStatus = true;
    } else {
        newFormErr.m_idcardTxt = '';
        newFormErr.m_idcardStatus = false;
    }

    // value phone
    const phoneVal: string = formDataSingUp.m_phone;
    if (!/^[0-9]{10}$/.test(phoneVal)) {
        newFormErr.m_phoneTxt = 'ระบุ Phone 10 ตัว เป็นเลขเท่านั้น';
        newFormErr.m_phoneStatus = true;
    } else {
        newFormErr.m_phoneTxt = '';
        newFormErr.m_phoneStatus = false;
    }

    // value email
    const emailVal: string = formDataSingUp.m_email;
    const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailVal.length < 1 || emailVal.length > 60 || !emailPattern.test(emailVal)) {
        newFormErr.m_emailTxt = 'ระบุ Email ไม่ถูกต้องหรือระบุ ระหว่าง Email 1 - 60 ตัวอักษร';
        newFormErr.m_emailStatus = true;
    } else {
        newFormErr.m_emailTxt = '';
        newFormErr.m_emailStatus = false;
    }

    return newFormErr;
}

// validateForm P0
export const validateFormP0 = (dataP0: FormDataP0): FromP0Err => {
    const newFormErr: FromP0Err = { ...dataFromP0Err };
    const setNewFormErr = ({ status, txt, name }: { status: boolean; txt: string; name:string; }) => {
       
        newFormErr[name+'Status'] = status;
        newFormErr[name+'Txt'] = txt;
       
    };
    // f1 รหัสบ้าน
    const f1Val: string = dataP0.p0F1;
    !/^[0-9]{10}$/.test(f1Val) || f1Val.length < 10 ? setNewFormErr({name:"p0F1",status:true,txt:"ระบุ รหัสบ้าน 10 ตัวเป็นตัวเลขเท่านั้น"}) : setNewFormErr({name:"p0F1",status:false,txt:""});

    // f2 หลังคาเรือนที่
    const f2Val: string = dataP0.p0F2;
    !/^[0-9]/.test(f2Val) || f1Val.length < 1 ? setNewFormErr({name:"p0F2",status:true,txt:"ระบุ หลังคาเรือนที่ เป็นตัวเลขเท่านั้น"}) : setNewFormErr({name:"p0F2",status:false,txt:""});

    // f3 address
    const f3Val: number = dataP0.p0F3;
    f3Val < 1 ? setNewFormErr({name:"p0F3",status:true,txt:"กรุณาเลือก ชื่อหมู่บ้าน"}) : setNewFormErr({name:"p0F3",status:false,txt:""});

    // f4 บ้านเลขที่
    const f4Val: string = dataP0.p0F4;
    f4Val.length < 1 ? setNewFormErr({name:"p0F4",status:true,txt:"กรุณาระบุ บ้านเลขที่"}) : setNewFormErr({name:"p0F4",status:false,txt:""});

    //  f9T คำนำหน้า
    const f9tVal: number = dataP0.p0F9T;
    f9tVal < 1 ? setNewFormErr({name:"p0F9T",status:true,txt:"กรุณาเลือก คำนำหน้าชื่อ"}) : setNewFormErr({name:"p0F9T",status:false,txt:""});

    // f9 ชื่อเจ้าของบ้าน
    const f9Val: string = dataP0.p0F9;
    f9Val.length < 1 ? setNewFormErr({name:"p0F9",status:true,txt:"กรุณาระบุ ชื่อเจ้าของบ้าน"}) : setNewFormErr({name:"p0F9",status:false,txt:""});

    // f10 นามสกุลเจ้าของบ้าน
    const f10Val: string = dataP0.p0F10;
    f10Val.length < 1 ? setNewFormErr({name:"p0F10",status:true,txt:"กรุณาระบุ นามสกุลเจ้าของบ้าน"}) : setNewFormErr({name:"p0F10",status:false,txt:""});

    // f11T คำนำหน้า
    const f11tVal: number = dataP0.p0F11T;
    f11tVal < 1 ? setNewFormErr({name:"p0F11T",status:true,txt:"กรุณาเลือก คำนำหน้าชื่อ"}) : setNewFormErr({name:"p0F11T",status:false,txt:""});

    // f11 ชื่อผู้ให้ข้อมูล
    const f11Val: string = dataP0.p0F11;
    f11Val.length < 1 ? setNewFormErr({name:"p0F11",status:true,txt:"กรุณาระบุ ชื่อผู้ให้ข้อมูล"}) : setNewFormErr({name:"p0F11",status:false,txt:""});

    // f12 นามสกุลผู้ให้ข้อมูล
    const f12Val: string = dataP0.p0F12;
    f12Val.length < 1 ? setNewFormErr({name:"p0F12",status:true,txt:"กรุณาระบุ นามสกุลผู้ให้ข้อมูล"}) : setNewFormErr({name:"p0F12",status:false,txt:""});

    // f13 หมายเลขโทรศัพท์ที่ติดต่อได้
    const f13Val: string = dataP0.p0F13;
    if(f13Val !== "-" && f13Val !== ""){
        !/^[0-9]{10}$/.test(f13Val) ? setNewFormErr({name:"p0F13",status:true,txt:"ระบุ หมายเลขโทรศัพท์ 10 ตัว เป็นเลขเท่านั้น"}) : setNewFormErr({name:"p0F13",status:false,txt:""});
    }

    //f14 จำนวนครอบครัวในครัวเรือน
    const f14Val: number = parseInt(dataP0.p0F14) ? parseInt(dataP0.p0F14) : 0;
    f14Val < 1 ? setNewFormErr({name:"p0F14",status:true,txt:"กรุณาระบุ จำนวนครอบครัว ตั้งแต่ 1 เป็นต้นไป"}) : setNewFormErr({name:"p0F14",status:false,txt:""});
  
    // f15 จำนวนสมาชิกทั้งหมดในครัวเรือน
    const f15Val = parseInt(dataP0.p0F15) ? parseInt(dataP0.p0F15) : 0;
    f15Val < 1 ? setNewFormErr({name:"p0F15",status:true,txt:"กรุณาระบุ จำนวนสมาชิก ตั้งแต่ 1 เป็นต้นไป"}) : setNewFormErr({name:"p0F15",status:false,txt:""});

    //f16 f17 จำนวนเพศชายและหญิง
    const f16Val = parseInt(dataP0.p0F16) ? parseInt(dataP0.p0F16) : 0;
    const f17Val = parseInt(dataP0.p0F17) ? parseInt(dataP0.p0F17) : 0;
    const totalGender = (f16Val + f17Val);
 
    if(totalGender !== 0){
        if(totalGender !== f15Val){
            setNewFormErr({name:"p0F16",status:true,txt:"กรุณาระบุ จำนวนเพศให้เท่ากับ จำนวนสมาชิก"});
        }else{
            setNewFormErr({name:"p0F16",status:false,txt:""});
        }
    }else{
        setNewFormErr({name:"p0F16",status:false,txt:"กรุณาระบุ เพศชาย ตั้งแต่ 1 เป็นต้นไป"});
        setNewFormErr({name:"p0F17",status:false,txt:"กรุณาระบุ เพศหญิง ตั้งแต่ 1 เป็นต้นไป"});
    }
  
    // f18t ชื่อผู้สำรวจ 1.
    const f18tVal: number = dataP0.p0F18T;
    f18tVal < 1 ? setNewFormErr({name:"p0F18T",status:true,txt:"กรุณาเลือก คำนำหน้าชื่อ"}) : setNewFormErr({name:"p0F18T",status:false,txt:""});

    // f18 ชื่อผู้สำรวจ 1.
    const f18Val: string = dataP0.p0F18;
    f18Val.length < 1 ? setNewFormErr({name:"p0F18",status:true,txt:"กรุณาระบุ ชื่อผู้สำรวจ 1."}) : setNewFormErr({name:"p0F18",status:false,txt:""});

    // f19 นามสกุลผู้สำรวจ 1.
    const f19Val: string = dataP0.p0F19;
    f19Val.length < 1 ? setNewFormErr({name:"p0F19",status:true,txt:"กรุณาระบุ นามสกุลผู้สำรวจ 1."}) : setNewFormErr({name:"p0F19",status:false,txt:""});

    // f20t f20 f21 ผู้สำรวจ 2.
    const f20tVal: number = dataP0.p0F20T;
    const f20Val: string = dataP0.p0F20;
    const f21Val: string = dataP0.p0F21;

    if(f20tVal > 1 || f20Val.length > 1 || f21Val.length > 1){
        if(f20tVal < 1 || f20Val.length < 1 || f21Val.length < 1){
            if(f20tVal < 1 ) setNewFormErr({name:"p0F20T",status:true,txt:"กรุณาเลือก คำนำหน้าชื่อ"});
            if(f20Val.length < 1) setNewFormErr({name:"p0F20",status:true,txt:"กรุณาระบุ ชื่อผู้สำรวจ 2."});
            if(f21Val.length < 1) setNewFormErr({name:"p0F21",status:true,txt:"กรุณาระบุ นามสกุลผู้สำรวจ 2."});
        }else{
            setNewFormErr({name:"p0F20T",status:false,txt:""});
            setNewFormErr({name:"p0F20",status:false,txt:""});
            setNewFormErr({name:"p0F21",status:false,txt:""});
        }
    }else{
        setNewFormErr({name:"p0F20T",status:false,txt:""});
        setNewFormErr({name:"p0F20",status:false,txt:""});
        setNewFormErr({name:"p0F21",status:false,txt:""});
    }

    // f22
    const f22Val:string = dataP0.p0F22;
    f22Val.length < 1 ? setNewFormErr({name:"p0F22",status:true,txt:"กรุณาระบุ วันที่สำรวจ"}) : setNewFormErr({name:"p0F22",status:false,txt:""});

    // f23 f24
    const f23Val:string = dataP0.p0F23;
    const f24Val:string = dataP0.p0F24;
    const f23f24Val:string = compareTimes(f23Val,f24Val);
    f23Val.length < 1 ? setNewFormErr({name:"p0F23",status:true,txt:"กรุณาระบุ เริ่มสำรวจเวลา"}) : setNewFormErr({name:"p0F23",status:false,txt:""});
    f24Val.length < 1 ? setNewFormErr({name:"p0F24",status:true,txt:"กรุณาระบุ เสร็จเวลา"}) : setNewFormErr({name:"p0F24",status:false,txt:""});
    
    if(f23Val.length !== 0 && f24Val.length !== 0) {
        if(f23f24Val !== '>'){
            setNewFormErr({name:"p0F23",status:true,txt:"ระบุ เสร็จเวลาน้อยกว่าเริ่มสำรวจเวลา"});
        } else {
            setNewFormErr({name:"p0F23",status:false,txt:""});
        }
    }
   
    return newFormErr;
}

//  สร้าง string Err หลังจากบันทึก
export const submitStrErr = (dataErr: messageSubmitP0): string => {
    const keysToInclude: (keyof messageSubmitP0)[] = [
        'p0F1Txt',
        'p0F2Txt',
        'p0F9TTxt',
        'p0F11TTxt',
        'p0F13Txt',
        'p0F14Txt',
        'p0F15Txt',
        'p0F16Txt',
        'p0F17Txt',
        'p0F18TTxt',
        'p0F23Txt'
      ];
    
      let str: string = '';
    
      keysToInclude.forEach(key => {
        if (dataErr[key]) {
          str += dataErr[key] + ' , ';
        }
      });
    
      // ตัดเครื่องหมาย ',' ที่อยู่ข้างหลัง
      if (str.length > 0) {
        str = str.slice(0, -3);
      }
    
      return str;
}

// validateForm P1
export const validateFormP1 = (dataP1: FormDataP1Type): FromP1Err => {

    const newFormErr: FromP1Err = { ...dataFromP1Err };
    const setNewFormErr = ({ status, txt, name }: { status: boolean; txt: string; name:string; }) => {
        newFormErr[name+'Status'] = status;
        newFormErr[name+'Txt'] = txt;
        newFormErr['status'] = true;
    };
    // f1 ครอบครัวที่
    if(!dataP1.p1F1) setNewFormErr({status:true, txt:"กรุณาเลือกครอบครัวที่", name:"p1F1"});
    // f2t คำนำหน้า
    if(!dataP1.p1F2T) setNewFormErr({status:true, txt:"กรุณาเลือกคำนำหน้าชื่อ", name:"p1F2T"});
    // f2 หมายเลขบัตรประชาชน
    if(dataP1.p1F2 !== "-"){
        if(dataP1.p1F2.length !== 13) setNewFormErr({status:true, txt:"กรุณารุบุหมายเลขบัตรประชาชน 13 หลัก", name:"p1F2"});
    } 
    // f3 ชื่อ
    if(dataP1.p1F3.length < 1) setNewFormErr({status:true, txt:"กรุณาระบุชื่อ", name:"p1F3"});
    // f4 นามสกุล
    if(dataP1.p1F4.length < 1) setNewFormErr({status:true, txt:"กรุณาระบุนามสกุล", name:"p1F4"});
    // f5 ความสัมพันธ์กับเจ้าบ้าน
    if(!dataP1.p1F5) setNewFormErr({status:true, txt:"กรุณาเลือกความสัมพันธ์กับเจ้าบ้าน", name:"p1F5"});
    // f6 วัน/เดือน/ปี ค.ศ. เกิด
    if(!dataP1.p1F6) setNewFormErr({status:true, txt:"กรุณาเลือกวัน/เดือน/ปี ค.ศ. เกิด", name:"p1F6"});
    // f7 อายุ
    const age: string = currentDateAge(dataP1.p1F6)
    if(dataP1.p1F7.length < 1 || age === "กรุณาเลือกวันที่ให้ถูกต้อง") setNewFormErr({status:true, txt:"กรุณาเลือกวันที่ให้ถูกต้อง", name:"p1F7"});
    // f8 เพศ
    if(!dataP1.p1F8) setNewFormErr({status:true, txt:"กรุณาเลือกคำนำหน้าชื่อเพื่อกำหนดเพศ", name:"p1F8"});
    if(dataP1.p1F2T?.value === 1 || dataP1.p1F2T?.value === 4){
        if(dataP1.p1F8?.value !== 1) setNewFormErr({status:true, txt:"กรุณาเลือกคำนำหน้าชื่อให้สอดคล้องกับเพศ", name:"p1F8"});
    }
    if(dataP1.p1F2T?.value === 2 || dataP1.p1F2T?.value === 3 || dataP1.p1F2T?.value === 5){
        if(dataP1.p1F8?.value !== 2) setNewFormErr({status:true, txt:"กรุณาเลือกคำนำหน้าชื่อให้สอดคล้องกับเพศ", name:"p1F8"});
    }
    // f9 การทะเบียนราษฎร์
    if(!dataP1.p1F9) setNewFormErr({status:true, txt:"กรุณาเลือกการทะเบียนราษฎร์", name:"p1F9"});
    // f10 สถานภาพ
    if(!dataP1.p1F10) setNewFormErr({status:true, txt:"กรุณาเลือกสถานภาพ", name:"p1F10"});
    // f11 การวางแผนครอบครัว
    if(!dataP1.p1F11) setNewFormErr({status:true, txt:"กรุณาเลือกการวางแผนครอบครัว", name:"p1F11"});
    // f12 ศาสนา/ความเชื่อ
    if(!dataP1.p1F12) setNewFormErr({status:true, txt:"กรุณาเลือกศาสนา/ความเชื่อ", name:"p1F12"});
    // f13 ระดับการศึกษา
    if(!dataP1.p1F13) setNewFormErr({status:true, txt:"กรุณาเลือกระดับการศึกษา", name:"p1F13"});
    // f14 การใช้ภาษาไทย(ฟัง)
    if(!dataP1.p1F14) setNewFormErr({status:true, txt:"กรุณาเลือกการใช้ภาษาไทย(ฟัง)", name:"p1F14"});
    // f15 การใช้ภาษาไทย(พูด)
    if(!dataP1.p1F15) setNewFormErr({status:true, txt:"กรุณาเลือกการใช้ภาษาไทย(พูด)", name:"p1F15"});
    // f16 การใช้ภาษาไทย(อ่าน)
    if(!dataP1.p1F16) setNewFormErr({status:true, txt:"กรุณาเลือกการใช้ภาษาไทย(อ่าน)", name:"p1F16"});
    // f17 การใช้ภาษาไทย(เขียน)
    if(!dataP1.p1F17) setNewFormErr({status:true, txt:"กรุณาเลือกการใช้ภาษาไทย(เขียน)", name:"p1F17"});
    // f18 อาศัยที่อยู่
    if(!dataP1.p1F18) setNewFormErr({status:true, txt:"กรุณาเลือกอาศัยที่อยู่", name:"p1F18"});
    // f19 สถานภาพการทำงานปัจจุบัน
    if(!dataP1.p1F19) setNewFormErr({status:true, txt:"กรุณาเลือกสถานภาพการทำงานปัจจุบัน", name:"p1F19"});
    // f20 อาชีพและรายได้ในปีที่ผ่านมา(อาชีพ)
    if(!dataP1.p1F20) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีที่ผ่านมา(อาชีพ)", name:"p1F20"});
    // f21 อาชีพและรายได้ในปีที่ผ่านมา(สถานที่ทำงาน)
    if(!dataP1.p1F21) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีที่ผ่านมา(สถานที่ทำงาน)", name:"p1F21"});
    // f22 อาชีพและรายได้ในปีที่ผ่านมา(รายได้ต่อเดือน(บาท))
    if(!dataP1.p1F22) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีที่ผ่านมา(รายได้ต่อเดือน(บาท))", name:"p1F22"});
    // f23 อาชีพและรายได้ในปีที่ผ่านมา(รายได้ต่อปี(บาท))
    if(!dataP1.p1F23) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีที่ผ่านมา(รายได้ต่อปี(บาท))", name:"p1F23"});
    // f24 สถานภาพการทำงานในปีหน้า
    if(!dataP1.p1F24) setNewFormErr({status:true, txt:"กรุณาเลือกสถานภาพการทำงานในปีหน้า", name:"p1F24"});
    // f25 อาชีพและรายได้ในปีหน้า(อาชีพ)
    if(!dataP1.p1F25) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีหน้า(อาชีพ)", name:"p1F25"});
    // f26 อาชีพและรายได้ในปีหน้า(สถานที่ทำงาน)
    if(!dataP1.p1F26) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีหน้า(สถานที่ทำงาน)", name:"p1F26"});
    // f27 อาชีพและรายได้ในปีหน้า(รายได้ต่อเดือน(บาท))
    if(!dataP1.p1F27) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีหน้า(รายได้ต่อเดือน(บาท))", name:"p1F27"});
    // f28 อาชีพและรายได้ในปีหน้า(รายได้ต่อปี(บาท))
    if(!dataP1.p1F28) setNewFormErr({status:true, txt:"กรุณาเลือกอาชีพและรายได้ในปีหน้า(รายได้ต่อปี(บาท))", name:"p1F28"});
  
    return newFormErr;
}