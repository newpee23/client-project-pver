import { Opprovince } from "../../types/atomsType";
import { dataSingUp, dataSingUpErr } from "../../types/authType";
import { ErrFromDataP0, FormDataP0, FormDataP1ReadOnlyType, FormDataP1Type, FromP0Err, FromP1Err } from "../../types/pageType";

export const dataInsertP0: FormDataP0 = {
    p0F1: "",
    p0F2: "",
    p0F3: 0,
    p0F4: "",
    p0F5: "",
    p0F6: "",
    p0F6Name: "",
    p0F7: "",
    p0F7Name: "",
    p0F8: "",
    p0F8Name: "",
    p0F9T: 0,
    p0F9: "",
    p0F10: "",
    p0F11T: 0,
    p0F11: "",
    p0F12: "",
    p0F13: "",
    p0F14: "",
    p0F15: "",
    p0F16: "",
    p0F17: "",
    p0F18T: 0,
    p0F18: "",
    p0F19: "",
    p0F20T: 0,
    p0F20: "",
    p0F21: "",
    p0F22: "",
    p0F23: "",
    p0F24: ""
}

export const dataErrPage0: ErrFromDataP0 = {
    isChecked: "",
}

export const prefixName: Opprovince[] = [
    {
      value: 1,
      label: "นาย"
    },
    {
      value: 2,
      label: "นาง"
    },
    {
      value: 3,
      label: "นางสาว"
    },
    {
      value: 4,
      label: "เด็กชาย"
    },
    {
      value: 5,
      label: "เด็กหญิง"
    }
];

export const genderSelect: Opprovince[] = [
  {
    value: 1,
    label: "ชาย"
  },
  {
    value: 2,
    label: "หญิง"
  }
];

export const dataFromSingUp: dataSingUp = {
  m_fname: "",
  m_lname: "",
  m_idcard: "",
  m_email: "",
  m_username: "",
  m_password: "",
  m_phone: "",
  m_address: "",
  m_level: "m"
}

export const dataFromSingUpErr: dataSingUpErr= {
  m_fnameStatus: false,
  m_fnameTxt: '',
  m_lnameStatus: false,
  m_lnameTxt: '',
  m_usernameStatus: false,
  m_usernameTxt: '',
  m_passwordStatus: false,
  m_passwordTxt: '',
  m_idcardStatus: false,
  m_idcardTxt: '',
  m_emailStatus: false,
  m_emailTxt: '',
  m_phoneStatus: false,
  m_phoneTxt: ''
};

export const dataFromP0Err: FromP0Err = {
  p0F1Status: false,
  p0F1Txt: '',
  p0F2Status: false,
  p0F2Txt: '',
  p0F3Status: false,
  p0F3Txt: '',
  p0F4Status: false,
  p0F4Txt: '',
  p0F9TStatus: false,
  p0F9TTxt: '',
  p0F9Status: false,
  p0F9Txt: '',
  p0F10Status: false,
  p0F10Txt: '',
  p0F11TStatus: false,
  p0F11TTxt: '',
  p0F11Status: false,
  p0F11Txt: '',
  p0F12Status: false,
  p0F12Txt: '',
  p0F13Status: false,
  p0F13Txt: '',
  p0F14Status: false,
  p0F14Txt: '',
  p0F15Status: false,
  p0F15Txt: '',
  p0F16Status: false,
  p0F16Txt: '',
  p0F17Status: false,
  p0F17Txt: '',
  p0F18TStatus: false,
  p0F18TTxt: '',
  p0F18Status: false,
  p0F18Txt: '',
  p0F19Status: false,
  p0F19Txt: '',
  p0F20TStatus: false,
  p0F20TTxt: '',
  p0F20Status: false,
  p0F20Txt: '',
  p0F21Status: false,
  p0F21Txt: '',
  p0F22Status: false,
  p0F22Txt: '',
  p0F23Status: false,
  p0F23Txt: '',
  p0F24Status: false,
  p0F24Txt: '',
}

export const dataFromP1Err: FromP1Err = {
  p1F1Status: false,
  p1F1Txt: '',
  p1F2Status: false,
  p1F2Txt: '',
  p1F2TStatus: false,
  p1F2TTxt: '',
  p1F3Status: false,
  p1F3Txt: '',
  p1F4Status: false,
  p1F4Txt: '',
  p1F5Status: false,
  p1F5Txt: '',
  p1F6Status: false,
  p1F6Txt: '',
  p1F7Status: false,
  p1F7Txt: '',
  p1F8Status: false,
  p1F8Txt: '',
  p1F9Status: false,
  p1F9Txt: '',
  p1F10Status: false,
  p1F10Txt: '',
  p1F11Status: false,
  p1F11Txt: '',
  p1F12Status: false,
  p1F12Txt: '',
  p1F13Status: false,
  p1F13Txt: '',
  p1F14Status: false,
  p1F14Txt: '',
  p1F15Status: false,
  p1F15Txt: '',
  p1F16Status: false,
  p1F16Txt: '',
  p1F17Status: false,
  p1F17Txt: '',
  p1F18Status: false,
  p1F18Txt: '',
  p1F19Status: false,
  p1F19Txt: '',
  p1F20Status: false,
  p1F20Txt: '',
  p1F21Status: false,
  p1F21Txt: '',
  p1F22Status: false,
  p1F22Txt: '',
  p1F23Status: false,
  p1F23Txt: '',
  p1F24Status: false,
  p1F24Txt: '',
  p1F25Status: false,
  p1F25Txt: '',
  p1F26Status: false,
  p1F26Txt: '',
  p1F27Status: false,
  p1F27Txt: '',
  p1F28Status: false,
  p1F28Txt: '',
  status: false
}

// P1F5
export const dataSelectP1F5: Opprovince[] = [
  {
    value: 1,
    label: "เจ้าบ้าน",
  },
  {
    value: 2,
    label: "สามี/ภรรยา",
  },
  {
    value: 3,
    label: "บิดา/มารดา",
  },
  {
    value: 4,
    label: "พี่/น้อง",
  },
  {
    value: 5,
    label: "บุตร",
  },
  {
    value: 6,
    label: "หลาน",
  },
  {
    value: 7,
    label: "หัวหน้าครอบครัว",
  },
  {
    value: 8,
    label: "ผู้อาศัย",
  },
  {
    value: 9,
    label: "อื่นๆ",
  },
];

// P1F9
export const dataSelectP1F9: Opprovince[] = [
  {
    value: 1,
    label: "ไม่มีบัตรใด ๆ",
  },
  {
    value: 2,
    label: "ท.ร.14(คนไทยมีสัญชาติไทย)",
  },
  {
    value: 3,
    label: "ท.ร.14(ไม่มีสัญชาติ/ต่างด้าว)",
  },
  {
    value: 4,
    label: "ท.ร.13(ไม่มีสัญชาติอาศัยชั่วคราว)",
  },
  {
    value: 5,
    label: "อื่นๆ",
  },
];

// P1F10
export const dataSelectP1F10: Opprovince[] = [
  {
    value: 1,
    label: "โสด",
  },
  {
    value: 2,
    label: "สมรส",
  },
  {
    value: 3,
    label: "ม่าย",
  },
  {
    value: 4,
    label: "หย่า",
  },
  {
    value: 5,
    label: "แยกกันอยู่",
  },
  {
    value: 6,
    label: "สมรสแต่ไม่ได้จดทะเบียน",
  },
  {
    value: 7,
    label: "ไม่ทราบ",
  },
];

// P1F11
export const dataSelectP1F11: Opprovince[] = [
  {
    value: 1,
    label: "ไม่ทำ",
  },
  {
    value: 2,
    label: "เป็นหมัน/หมดวัย",
  },
  {
    value: 3,
    label: "เป็นหมัน(ชาย)",
  },
  {
    value: 4,
    label: "เป็นหมัน(หญิง)",
  },
  {
    value: 5,
    label: "ใส่ห่วง",
  },
  {
    value: 6,
    label: "ฝังยา",
  },
  {
    value: 7,
    label: "ฉีดยา",
  },
  {
    value: 8,
    label: "ยาคุม",
  },
  {
    value: 9,
    label: "ถุงยาง",
  },
  {
    value: 10,
    label: "อื่นๆ",
  },
];

// P1F12
export const dataSelectP1F12: Opprovince[] = [
  {
    value: 1,
    label: "พุทธ",
  },
  {
    value: 2,
    label: "คริสต์",
  },
  {
    value: 3,
    label: "อิสลาม",
  },
  {
    value: 4,
    label: "ผี(บรรพบุรุษ)",
  },
  {
    value: 5,
    label: "ไม่นับถือ",
  },
  {
    value: 6,
    label: "อื่นๆ",
  },
];

// P1F13
export const dataSelectP1F13: Opprovince[] = [
  {
    value: 1,
    label: "ยังไม่ถึงวัยศึกษา",
  },
  {
    value: 2,
    label: "ไม่ได้เรียน",
  },
  {
    value: 3,
    label: "อนุบาล",
  },
  {
    value: 4,
    label: "ประถมศึกษา",
  },
  {
    value: 5,
    label: "มัธยมศึกษาตอนต้น",
  },
  {
    value: 6,
    label: "มัธยมศึกษาตอนปลาย",
  },
  {
    value: 7,
    label: "ปวช.",
  },
  {
    value: 8,
    label: "ปวท./ปวส.",
  },
  {
    value: 9,
    label: "ปริญญาตรี",
  },
  {
    value: 10,
    label: "ปริญญาโท",
  },
  {
    value: 11,
    label: "ปริญญาเอก",
  },
];

// P1F18
export const dataSelectP1F18: Opprovince[] = [
  {
    value: 1,
    label: "ในหมู่บ้าน",
  },
  {
    value: 2,
    label: "นอกหมู่บ้าน(มากกว่า 6 เดือน)",
  }
];

// P1 สถานภาพการทำงาน
export const dataSelectP1F19: Opprovince[] = [
  {
    value: 1,
    label: "ทำงาน",
  },
  {
    value: 2,
    label: "เด็ก/เยาวชนกำลังเรียน",
  },
  {
    value: 3,
    label: "เด็ก/เยาวชนไม่ได้เรียน",
  },
  {
    value: 4,
    label: "เด็กเล็กยังไม่ถึงวัยเรียน",
  },
  {
    value: 5,
    label: "คนพิการ/ป่วย/ไม่สามารถทำงานได้",
  },
  {
    value: 6,
    label: "วัยชรา",
  },
  {
    value: 7,
    label: "ตั้งครรภ์",
  },
  {
    value: 8,
    label: "ว่างงาน(ต้องการทำงาน)",
  },
  {
    value: 9,
    label: "ว่างงาน(ไม่ต้องการทำงาน)",
  },
  {
    value: 10,
    label: "อื่นๆ",
  }
];

// P1 อาชีพหลักและอาชีพรอง
export const dataSelectP1F20: Opprovince[] = [
  {
    value: 1,
    label: "อาชีพหลัก",
  },
  {
    value: 2,
    label: "อาชีพรอง",
  }
];

// P1 สถานที่ทำงาน
export const dataSelectP1F22: Opprovince[] = [
  {
    value: 1,
    label: "ในหมู่บ้าน",
  },
  {
    value: 2,
    label: "ในตำบล",
  },
  {
    value: 3,
    label: "ในอำเภอ",
  },
  {
    value: 4,
    label: "ในจังหวัด",
  },
  {
    value: 5,
    label: "ต่างจังหวัด",
  },
  {
    value: 6,
    label: "ต่างประเทศ",
  }
];

// P1 อาชีพ
export const dataSelectP1F29: Opprovince[] = [
  {
    value: 1,
    label: "เกษตรกร",
  },
  {
    value: 2,
    label: "รับจ้าง",
  },
  {
    value: 3,
    label: "ค้าขาย",
  },
  {
    value: 4,
    label: "รับราชการ",
  },
  {
    value: 5,
    label: "ลูกจ้าง/พนักงานราชการ",
  },
  {
    value: 6,
    label: "ลูกจ้างเอกชน",
  },
  {
    value: 7,
    label: "นักธุรกิจ/นายจ้าง",
  },
  {
    value: 8,
    label: "อื่นๆ",
  }
];

// P1 ใช่หรือไม่
export const dataSelectConform: Opprovince[] = [
  {
    value: 1,
    label: "ได้",
  },
  {
    value: 2,
    label: "ไม่ได้",
  }
];

// dataPage1 
export const dataInsertP1:FormDataP1Type = {
  p1F1: null,
  p1F2T: null,
  p1F2: "",
  p1F3: "",
  p1F4: "",
  p1F5: null,
  p1F6: "",
  p1F7: "",
  p1F8: null,
  p1F9: null,
  p1F10: null,
  p1F11: null,
  p1F12: null,
  p1F13: null,
  p1F14: null,
  p1F15: null,
  p1F16: null,
  p1F17: null,
  p1F18: null,
  p1F19: null,
  p1F20: null,
  p1F21: null,
  p1F22: "",
  p1F23: "",
  p1F24: null,
  p1F25: null,
  p1F26: null,
  p1F27: "",
  p1F28: ""
}

// dataPage1 
export const dataInsertReadonlyP1:FormDataP1ReadOnlyType = {
  p1F1: false,
  p1F2T: false,
  p1F2: false,
  p1F3: false,
  p1F4: false,
  p1F5: false,
  p1F6: false,
  p1F7: true,
  p1F8: true,
  p1F9: false,
  p1F10: false,
  p1F11: false,
  p1F12: false,
  p1F13: false,
  p1F14: false,
  p1F15: false,
  p1F16: false,
  p1F17: false,
  p1F18: false,
  p1F19: false,
  p1F20: false,
  p1F21: false,
  p1F22: false,
  p1F23: false,
  p1F24: false,
  p1F25: false,
  p1F26: false,
  p1F27: false,
  p1F28: false
}