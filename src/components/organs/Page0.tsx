import { ChangeEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { ErrFromDataP0, FormDataP0, FromP0Err, banData, pageComponents, resultSubmitP0 } from "../../types/pageType"
import DivHeadQuestion from "../atoms/DivHeadQuestion"
import DivHr from "../atoms/DivHr"
import InputFieldAuth from "../atoms/InputFieldAuth"
import { dataErrPage0, dataFromP0Err, dataInsertP0, prefixName } from "../function/initialDataFrom"
import { SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store"
import DropDown from "../atoms/DropDown"
import { setAddressP0 } from "../../store/slices/pageSlices"
import { Opprovince, OpprovinceSelet } from "../../types/atomsType"
import DivButton from "../atoms/DivButton"
import { submitStrErr, validateFormP0 } from "../function/validateForm"
import DivTextMesErr from "../atoms/DivTextMesErr"
import LoadingCheck from "../atoms/LoadingCheck"
import { savePage0, updatePage0 } from "../../api/pageApi"
import ModalSave from "../atoms/ModalSave"
import SubmitErr from "../atoms/SubmitErr"
import { findQuestionnaire } from "../../store/slices/homeSlices";
import { userLogin } from "../../types/authType";

const Page0 = (props: pageComponents) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ban } = useAppSelector((state) => state?.page);
  const { address } = useAppSelector((state) => state?.page);
  const { editDataPage0 } = useAppSelector((state) => state?.page);
  const [datafrom, setDataFrom] = useState<FormDataP0>(dataInsertP0);
  const [dataErr, setDataErr] = useState<ErrFromDataP0>(dataErrPage0);
  const [errTxtErr, setErrTxtErr] = useState<FromP0Err>(dataFromP0Err);
  const [submitStatus, setSubmitStatus] = useState<resultSubmitP0>({ message: "", status: false });
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCheckFrom, setIsCheckFrom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOptionP0F11T, setSelectedOptionP0F11T] = useState<Opprovince | null>(null);
  const [selectedOptionP0, setSelectedOptionP0] = useState<OpprovinceSelet>({ selectP03: null, selectP09t: null, selectP018t: null, selectP020t: null, });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updateData = (newValue: string = value) => {
      setDataFrom((prevData) => ({
        ...prevData,
        [name]: newValue.trim(),
      }));
    };

    if (isChecked && (name === 'p0F9' || name === 'p0F10')) {
      setDataFrom((prevData) => ({
        ...prevData,
        p0F11T: 0,
        p0F11: "",
        p0F12: "",
      }));
      setSelectedOptionP0F11T(null);
      setIsChecked(false);
      updateData();
    } else {
      updateData();
    }
  };

  const handleDropDownBan = (selectedOption: SingleValue<banData>) => {
    if (selectedOption !== null) {
      if (selectedOption && !Array.isArray(selectedOption)) {
        setDataFrom((prevData) => ({
          ...prevData,
          p0F3: selectedOption.value,
        }));
        dispatch(setAddressP0(selectedOption.value));
      } else {
        // Handle multi-select logic here if needed
      }
    } else {
      setDataFrom((prevData) => ({
        ...prevData,
        p0F3: 0,
      }));
      dispatch(setAddressP0(0));
      setSelectedOptionP0((prevData) => ({
        ...prevData,
        selectP03: null,
      }));
    }
  };

  const setF11F12FromChecked = () => {
    if (datafrom.p0F9T && datafrom.p0F9 && datafrom.p0F10) {
      const valPrefixName = prefixName.find((item) => item.value === datafrom.p0F9T);
      if (valPrefixName) {
        setSelectedOptionP0F11T(valPrefixName);
      }
      setDataFrom((prevData) => ({
        ...prevData,
        p0F11T: datafrom.p0F9T,
        p0F11: datafrom.p0F9,
        p0F12: datafrom.p0F10,
      }));
      if (dataErr.isChecked) {
        setDataErr((ErrData) => ({
          ...ErrData,
          isChecked: "",
        }));
        setDataFrom((prevData) => ({
          ...prevData,
          p0F11T: 0,
          p0F11: "",
          p0F12: "",
        }));
      }

    } else {
      setDataErr((ErrData) => ({
        ...ErrData,
        isChecked: "(*กรุณาเพิ่มข้อมูล ชื่อเจ้าของบ้าน)",
      }));
      setIsChecked(!isChecked)
    }
  }

  const handlePreFixName = (selectedOption: SingleValue<banData>, field: string) => {
    if (selectedOption !== null) {
      if (selectedOption && !Array.isArray(selectedOption)) {
        if (field === 'p0F9T' && isChecked) {
          setIsChecked(false);
        }
        const valPrefixName = prefixName.find((item) => item.value === selectedOption.value);
        if (valPrefixName && field === 'p0F11T') {
          setSelectedOptionP0F11T(valPrefixName);
        }
        if (valPrefixName && field === 'p0F9T') {
          setSelectedOptionP0((prevData) => ({ ...prevData, selectP09t: { label: valPrefixName.label, value: valPrefixName.value }, }));
        }
        if (valPrefixName && field === 'p0F18T') {
          setSelectedOptionP0((prevData) => ({ ...prevData, selectP018t: { label: valPrefixName.label, value: valPrefixName.value }, }));
        }
        if (valPrefixName && field === 'p0F20T') {
          setSelectedOptionP0((prevData) => ({ ...prevData, selectP020t: { label: valPrefixName.label, value: valPrefixName.value }, }));
        }
        setDataFrom((prevData) => ({
          ...prevData,
          [field]: selectedOption.value,
        }));
        // dispatch(setAddressP0(selectedOption.value));
      }
    } else {
      if (field === 'p0F9T' && isChecked) {
        setIsChecked(false);
      }
      if (field === 'p0F11T') {
        setSelectedOptionP0F11T(null);
      }
      if (field === 'p0F9T') {
        setSelectedOptionP0((prevData) => ({ ...prevData, selectP09t: null, }));
      }
      if (field === 'p0F18T') {
        setSelectedOptionP0((prevData) => ({ ...prevData, selectP018t: null, }));
      }
      if (field === 'p0F20T') {
        setSelectedOptionP0((prevData) => ({ ...prevData, selectP020t: null, }));
      }
      setDataFrom((prevData) => ({
        ...prevData,
        [field]: 0,
      }));
      // dispatch(setAddressP0(0));
    }
  };

  const handleSubmit = async (): Promise<void> => {

    const resultSubmit: resultSubmitP0 = props.status === "insert" ? await savePage0(datafrom) : await updatePage0(datafrom);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (resultSubmit) setSubmitStatus(resultSubmit);

    if (resultSubmit.status === true) {
      const user = localStorage.getItem('userLogin');
      const parsedData: userLogin = user && JSON.parse(user);
      const fId = localStorage.getItem('questionId');
      if (fId) {
        await dispatch(findQuestionnaire({ f_id: fId, id: parsedData.id }));
        if (props.status === "insert") {
          navigate("/Page/edit/0");
          setIsCheckFrom(!isCheckFrom);
        } else {
          setIsCheckFrom(false);
        }
      }
    }
  }

  const handleCheckFrom = (): void => {
    setLoadingPage(true);
    setErrTxtErr(dataFromP0Err);
    const newFormErr = validateFormP0(datafrom);

    if (newFormErr.p0F1Status || newFormErr.p0F2Status || newFormErr.p0F3Status || newFormErr.p0F4Status || newFormErr.p0F9TStatus || newFormErr.p0F9Status
      || newFormErr.p0F10Status || newFormErr.p0F11TStatus || newFormErr.p0F11Status || newFormErr.p0F12Status || newFormErr.p0F13Status || newFormErr.p0F14Status || newFormErr.p0F15Status || newFormErr.p0F16Status
      || newFormErr.p0F17Status || newFormErr.p0F18TStatus || newFormErr.p0F18Status || newFormErr.p0F19Status || newFormErr.p0F20TStatus || newFormErr.p0F20Status || newFormErr.p0F21Status || newFormErr.p0F22Status
      || newFormErr.p0F23Status || newFormErr.p0F24Status) {

      window.scrollTo({ top: 0, behavior: 'smooth' });
      setErrTxtErr(newFormErr);
      setIsCheckFrom(false)
    } else {
      if (datafrom.p0F13 === "") setDataFrom((prevData) => ({ ...prevData, p0F13: "-", }));
      if (datafrom.p0F20 === "") setDataFrom((prevData) => ({ ...prevData, p0F20: "-", }));
      if (datafrom.p0F21 === "") setDataFrom((prevData) => ({ ...prevData, p0F21: "-", }));
      setIsCheckFrom(true);
    }

    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);

  }

  const btnSaveShow = (): JSX.Element => {
    if (!isCheckFrom && !loadingPage) {
      const btn: JSX.Element = (
        <div>
          <DivButton textBtn="ตรวจสอบข้อมูล" type="button" onClick={handleCheckFrom} divClass="text-center" className="mt-5 focus:outline-none text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-md text-md px-4 py-2" />
          <DivTextMesErr className="text-center text-sm text-amber-700 mt-2" text="(กรุณาตรวจสอบข้อมูล)" />
        </div>
      );
      return btn;
    }
    const btn: JSX.Element = (
      <div>
        <div className="flex justify-center">
          <DivButton textBtn="แก้ไขข้อมูล" onClick={() => setIsCheckFrom(!isCheckFrom)} type="button" divClass="text-center" className="mt-5 mr-1 focus:outline-none text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 font-medium rounded-md text-md px-4 py-2" />
          <DivButton textBtn="บันทึกข้อมูล" onClick={() => setIsModalOpen(true)} type="button" divClass="text-center" className={`mt-5 ml-1 focus:outline-none text-white ${props.status === "insert" ? "bg-green-500 hover:bg-green-600 focus:ring-green-300" : "bg-amber-500 hover:bg-amber-600 focus:ring-amber-300"} focus:ring-4  font-medium rounded-md text-md px-4 py-2`} />
        </div>
        <DivTextMesErr className="text-center text-sm text-green-700 mt-2" text="(ตรวจสอบข้อมูลเรียบร้อย)" />
      </div>
    );
    return btn;
  };

  const showErrSubmit = (): JSX.Element => {

    const strErr: string = typeof submitStatus.message !== "string" ? submitStrErr(submitStatus.message) : '';

    const showErr: JSX.Element = (
      <div className="m-3 sml:m-5 sml:mt-0 lgl:m-8 lgl:mb-5 lgl:mt-0 p-3 sml:p-5 bg-white border rounded-lg shadow border-l-4 border-r-4 border-r-violet-700 border-l-violet-700">
        <SubmitErr text={(typeof submitStatus.message === "string") ? submitStatus.message : strErr} className={`flex items-center w-full flex-col sml:flex-row p-4 text-sm ${submitStatus.status ? 'text-green-800' : 'text-red-800'} rounded-lg ${submitStatus.status ? 'bg-green-50' : 'bg-red-50'}`} status={submitStatus.status} />
      </div>
    );

    return showErr;
  }

  useEffect(() => {
    if (address.length > 0) {
      setSelectedOptionP0((prevData) => ({
        ...prevData,
        selectP03: { label: address[0].ban, value: address[0].id },
      }));
      setDataFrom((prevData) => ({
        ...prevData,
        p0F5: address[0].mo,
        p0F6: address[0].tambon_code,
        p0F6Name: address[0].tombonName,
        p0F7: address[0].ampher_code,
        p0F7Name: address[0].ampherName,
        p0F8: address[0].province_code,
        p0F8Name: address[0].provinceName,
      }));
    }

  }, [address]);

  useEffect(() => {

    if (isChecked) {
      setF11F12FromChecked();
    } else {
      setDataFrom((prevData) => ({
        ...prevData,
        p0F11T: 0,
        p0F11: "",
        p0F12: "",
      }));
      setSelectedOptionP0F11T(null);
    }

  }, [isChecked]);

  useEffect(() => {

    if (typeof editDataPage0.message !== 'string' && editDataPage0.message.p0F1) {
      const banId: number = editDataPage0.message.p0F3;
      setDataFrom(editDataPage0.message);
      dispatch(setAddressP0(banId));

      if (editDataPage0.message.p0F9T === editDataPage0.message.p0F11T && editDataPage0.message.p0F9 === editDataPage0.message.p0F11 && editDataPage0.message.p0F10 === editDataPage0.message.p0F12) {
        setIsChecked(true);
      }
      if (editDataPage0.message.p0F9T) {

        const f9T: number = editDataPage0.message.p0F9T;
        const f11T: number = editDataPage0.message.p0F11T;
        const f18T: number = editDataPage0.message.p0F18T;
        const f20T: number = editDataPage0.message.p0F20T;

        const valPrefixNameF9T = prefixName.find((item) => item.value === f9T);
        const valPrefixNameFf11T = prefixName.find((item) => item.value === f11T);
        const valPrefixNameFf18T = prefixName.find((item) => item.value === f18T);
        const valPrefixNameFf20T = prefixName.find((item) => item.value === f20T);

        if (valPrefixNameF9T && valPrefixNameFf11T && valPrefixNameFf18T) {

          setSelectedOptionP0((prevData) => ({
            ...prevData,

            selectP09t: { label: valPrefixNameF9T.label, value: valPrefixNameF9T.value },
            selectP018t: { label: valPrefixNameFf18T.label, value: valPrefixNameFf18T.value },
            selectP020t: valPrefixNameFf20T ? { label: valPrefixNameFf20T.label, value: valPrefixNameFf20T.value } : null,
          }));
          setSelectedOptionP0F11T((prevData) => ({
            ...prevData,
            label: valPrefixNameFf11T.label, value: valPrefixNameFf11T.value,
          }))
        }
      }
    }

  }, [editDataPage0]);

  return (
    <>
      <div className="m-3 sml:m-5 sml:mt-0 lgl:m-8 lgl:mb-5 lgl:mt-0 p-3 sml:p-5 bg-white border rounded-lg shadow border-l-4 border-r-4 border-r-violet-700 border-l-violet-700">
        <p className="font-semibold text-purple-800">หมายเหตุ</p>
        <p className="text-sm"><span className="text-red-600">* กรุณากรอกข้อมูล</span> หากเป็นการระบุตัวเลขแล้ว<u className="text-purple-800">ไม่มีข้อมูลใส่ 0</u> หากเป็นการระบุตัวอักษรแล้ว<u className="text-purple-800">ไม่มีข้อมูลใส่ -</u></p>
      </div>
      {submitStatus.message ? showErrSubmit() : null}
      <div className="m-3 sml:m-5 sml:mt-0 lgl:m-8 lgl:mb-5 lgl:mt-0 bg-white border border-gray-200 rounded-xl shadow">
        <div>
          <DivHeadQuestion head={props.status === "insert" ? "หน้าหลัก / เพิ่มข้อมูล" : "หน้าหลัก / แก้ไขข้อมูล"} status={props.status} editPage="0" />
          <DivHr divClass="flex justify-center" className="h-px bg-gray-200 border-0 w-full" />
          <div className="p-5">
            <form>

              {/* div หน้าหลัก */}
              <div className="overflow-x-auto w-full">
                {/* row รหัสบ้าน */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 hover:bg-gray-100">
                  <div className="m-3"></div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="รหัสบ้าน" readonly={isCheckFrom} name="p0F1" type="number" placeholder="รหัสบ้าน ระบุตัวเลขเท่านั้น" maxLength={9999999999} required={true} value={datafrom.p0F1} onChange={(e) => handleInputChange(e)} className="w-full border border-purple-00 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                    {errTxtErr.p0F1Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F1Txt} />}
                  </div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="หลังคาเรือนที่" readonly={isCheckFrom} minLength={0} name="p0F2" type="number" placeholder="หลังคาเรือนที่ ระบุตัวเลขเท่านั้น" required={true} value={datafrom.p0F2} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                    {errTxtErr.p0F2Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F2Txt} />}
                  </div>
                  <div className="m-3 mb-0">
                    <DropDown label="ชื่อหมู่บ้าน" isClearable={true} value={selectedOptionP0.selectP03} isDisabled={isCheckFrom} onChange={handleDropDownBan} isSearchable={true} required={true} placeholder="เลือกชื่อหมู่บ้าน" options={ban} name="p0F3" className="w-full text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block" />
                    {errTxtErr.p0F3Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F3Txt} />}
                  </div>
                  <div className="m-3 hidden md:block"></div>
                </div>
                {/* row รหัสบ้าน */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row บ้านเลขที่ */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 hover:bg-gray-100">
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="บ้านเลขที่" readonly={isCheckFrom} name="p0F4" type="text" placeholder="บ้านเลขที่" required={true} value={datafrom.p0F4} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                    {errTxtErr.p0F4Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F4Txt} />}
                  </div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="หมู่ที่" name="p0F5" type="text" placeholder="หมู่ที่ (เลือกชื่อหมู่บ้าน)" readonly={true} value={address.length === 1 ? datafrom.p0F5 : ''} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                  </div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="ตำบล" name="p0F6" type="text" placeholder="ตำบล (เลือกชื่อหมู่บ้าน)" readonly={true} value={address.length === 1 ? datafrom.p0F6Name : ''} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                  </div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="อำเภอ" name="p0F7" type="text" placeholder="อำเภอ (เลือกชื่อหมู่บ้าน)" readonly={true} value={address.length === 1 ? datafrom.p0F7Name : ''} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                  </div>
                  <div className="m-3 mb-0">
                    <InputFieldAuth label="จังหวัด" name="p0F8" type="text" placeholder="จังหวัด (เลือกชื่อหมู่บ้าน)" readonly={true} value={address.length === 1 ? datafrom.p0F8Name : ''} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                  </div>
                </div>
                {/* row บ้านเลขที่ */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row ชื่อเจ้าของบ้าน (เลือกคำนำหน้าชื่อ) */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 pt-2 lg:grid-cols-4 xl:grid-cols-5 ">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label">
                        ชื่อเจ้าของบ้าน (เลือกคำนำหน้าชื่อ) <span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="max-w-full md:max-w-[180px] m-3 mb-0">
                      <DropDown label="" isClearable={true} isDisabled={isCheckFrom} value={selectedOptionP0.selectP09t} onChange={(selectedOption) => handlePreFixName(selectedOption, "p0F9T")} isSearchable={false} required={true} placeholder="เลือกคำนำหน้าชื่อ" options={prefixName} name="p0F9T" className="w-full text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block" />
                      {errTxtErr.p0F9TTxt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F9TTxt} />}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 hidden lg:block"></div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F9" type="text" placeholder="ชื่อ" readonly={isCheckFrom} required={true} value={datafrom.p0F9} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F9Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F9Txt} />}
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F10" type="text" placeholder="นามสกุล" readonly={isCheckFrom} required={true} value={datafrom.p0F10} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F10Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F10Txt} />}
                    </div>
                  </div>
                </div>
                {/* row ชื่อเจ้าของบ้าน (เลือกคำนำหน้าชื่อ) */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row ชื่อผู้ให้ข้อมูล (เลือกคำนำหน้าชื่อ) */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 pt-2 lg:grid-cols-4 xl:grid-cols-5 ">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label">
                        ชื่อผู้ให้ข้อมูล (เลือกคำนำหน้าชื่อ) <span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="max-w-full md:max-w-[180px] m-3 mb-0">
                      <DropDown label="" value={selectedOptionP0F11T} isClearable={true} onChange={(selectedOption) => handlePreFixName(selectedOption, "p0F11T")} isDisabled={isChecked} isSearchable={false} required={true} placeholder="เลือกคำนำหน้าชื่อ" options={prefixName} name="p0F11T" className="w-full text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block" />
                      {errTxtErr.p0F11TTxt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F11TTxt} />}
                    </div>
                    <div className="m-3 mb-0">
                      <div className="flex items-center">
                        <input id="link-checkbox" checked={isChecked} disabled={isCheckFrom} onChange={() => setIsChecked(!isChecked)} type="checkbox" value="" className="w-5 h-5 text-purple-600 accent-purple-700 rounded focus:ring-purple-500 cursor-pointer" />
                        <label className="ml-2 text-sm font-medium text-gray-900">ใช้ข้อมูลเดียวกับ <span className="text-purple-600 hover:underline">ชื่อเจ้าของบ้าน</span></label>
                      </div>
                      {dataErr.isChecked && <label className="ml-2 text-sm font-medium text-red-700"><b>{dataErr.isChecked}</b></label>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 hidden lg:block"></div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F11" type="text" placeholder="ชื่อ" required={true} value={datafrom.p0F11} readonly={isChecked} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F11Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F11Txt} />}
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F12" type="text" placeholder="นามสกุล" required={true} value={datafrom.p0F12} readonly={isChecked} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F12Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F12Txt} />}
                    </div>
                  </div>
                </div>
                {/* row ชื่อผู้ให้ข้อมูล (เลือกคำนำหน้าชื่อ) */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row หมายเลขโทรศัพท์ที่ติดต่อได้ (บ้าน/มือถือ) */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label">
                        หมายเลขโทรศัพท์ที่ติดต่อได้ (บ้าน/มือถือ)
                      </label>
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F13" readonly={isCheckFrom} type="text" placeholder="หมายเลขโทรศัพท์" value={datafrom.p0F13} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F13Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F13Txt} />}
                    </div>
                  </div>
                </div>
                {/* row หมายเลขโทรศัพท์ที่ติดต่อได้ (บ้าน/มือถือ) */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row จำนวนครอบครัวในครัวเรือน */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                        จำนวนครอบครัวในครัวเรือน <span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F14" type="number" required={true} readonly={isCheckFrom} placeholder="จำนวนครอบครัว" value={datafrom.p0F14} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F14Txt && <DivTextMesErr className="text-sm text-red-700 font-semibold" text={errTxtErr.p0F14Txt} />}
                    </div>
                    <div className="m-3 mb-0 items-center  hidden lg:flex">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                        ครอบครัว
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                        จำนวนสมาชิกทั้งหมดในครัวเรือน <span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F15" type="number" required={true} readonly={isCheckFrom} placeholder="จำนวนคน" value={datafrom.p0F15} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F15Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F15Txt} />}
                    </div>
                    <div className="m-3 mb-0 items-center hidden lg:flex">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                        คน
                      </label>
                    </div>
                    <div className="m-3 mb-0 flex">
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          ชาย
                        </label>
                      </div>
                      <div className="ml-2 mr-2">
                        <InputFieldAuth label="" name="p0F16" type="number" required={true} readonly={isCheckFrom} placeholder="จำนวนเพศชาย" value={datafrom.p0F16} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                        {errTxtErr.p0F16Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F16Txt} />}
                      </div>
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          คน
                        </label>
                      </div>
                    </div>
                    <div className="m-3 mb-0 flex">
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          หญิง
                        </label>
                      </div>
                      <div className="ml-2 mr-2">
                        <InputFieldAuth label="" name="p0F17" type="number" required={true} readonly={isCheckFrom} placeholder="จำนวนเพศหญิง" value={datafrom.p0F17} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                        {errTxtErr.p0F17Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F17Txt} />}
                      </div>
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          คน
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row จำนวนครอบครัวในครัวเรือน */}
              </div>

              {/* div สำหรับทีมสำรวจข้อมูล */}
              <div className="overflow-x-auto w-full">
                <div className="flex justify-between bg-violet-800">
                  <div className="text:md md:text-lg p-2 sml:p-3 tracking-tight text-white ">สำหรับทีมสำรวจข้อมูล</div>
                </div>
                {/* row ชื่อผู้สำรวจ 1. (เลือกคำนำหน้าชื่อ) */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 pt-5">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label">
                        ชื่อผู้สำรวจ 1. (เลือกคำนำหน้าชื่อ) <span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="max-w-full md:max-w-[180px] m-3 mb-0">
                      <DropDown label="" isClearable={true} isDisabled={isCheckFrom} value={selectedOptionP0.selectP018t} onChange={(selectedOption) => handlePreFixName(selectedOption, "p0F18T")} isSearchable={false} required={true} placeholder="เลือกคำนำหน้าชื่อ" options={prefixName} name="p0F18T" className="w-full text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block" />
                      {errTxtErr.p0F18TTxt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F18TTxt} />}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 hidden lg:block"></div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F18" type="text" placeholder="ชื่อ" required={true} readonly={isCheckFrom} value={datafrom.p0F18} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F18Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F18Txt} />}
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F19" type="text" placeholder="นามสกุล" required={true} readonly={isCheckFrom} value={datafrom.p0F19} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F19Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F19Txt} />}
                    </div>
                  </div>
                </div>
                {/* row ชื่อผู้สำรวจ 1. (เลือกคำนำหน้าชื่อ) */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row ชื่อผู้สำรวจ 2. (เลือกคำนำหน้าชื่อ) */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 pt-2 lg:grid-cols-4 xl:grid-cols-5 ">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label">
                        ชื่อผู้สำรวจ 2. (เลือกคำนำหน้าชื่อ)
                      </label>
                    </div>
                    <div className="max-w-full md:max-w-[180px] m-3 mb-0">
                      <DropDown label="" isClearable={true} isDisabled={isCheckFrom} value={selectedOptionP0.selectP020t} onChange={(selectedOption) => handlePreFixName(selectedOption, "p0F20T")} isSearchable={false} required={false} placeholder="เลือกคำนำหน้าชื่อ" options={prefixName} name="p0F20T" className="w-full text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block" />
                      {errTxtErr.p0F20TTxt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F20TTxt} />}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 hidden lg:block"></div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F20" type="text" required={false} readonly={isCheckFrom} placeholder="ชื่อ" value={datafrom.p0F20} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F20Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F20Txt} />}
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F21" type="text" required={false} readonly={isCheckFrom} placeholder="นามสกุล" value={datafrom.p0F21} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F21Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F21Txt} />}
                    </div>
                  </div>
                </div>
                {/* row ชื่อผู้สำรวจ 2. (เลือกคำนำหน้าชื่อ) */}
                <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
                {/* row สำรวจ ณ วันที่ */}
                <div className="hover:bg-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <div className="m-3 mb-0 flex items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                        สำรวจ ณ วันที่ &nbsp;<span className="text-red-700"><b>*</b></span>
                      </label>
                    </div>
                    <div className="m-3 mb-0">
                      <InputFieldAuth label="" name="p0F22" type="date" required={true} readonly={isCheckFrom} placeholder="จำนวนคน" value={datafrom.p0F22} onChange={(e) => handleInputChange(e)} className="w-full border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                      {errTxtErr.p0F22Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F22Txt} />}
                    </div>
                    <div className="m-3 mb-0 hidden lg:block"></div>
                    <div className="m-3 mb-0 flex justify-start">
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          เริ่มสำรวจเวลา
                        </label>
                      </div>
                      <div className="ml-2 mr-2">
                        <InputFieldAuth label="" name="p0F23" type="time" required={true} readonly={isCheckFrom} value={datafrom.p0F23} onChange={(e) => handleInputChange(e)} className="w-full border min-w-[100px] border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                        {errTxtErr.p0F23Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F23Txt} />}
                      </div>
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          น.
                        </label>
                      </div>
                    </div>
                    <div className="m-3 mb-0 flex justify-start">
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          เสร็จเวลา
                        </label>
                      </div>
                      <div className="ml-2 mr-2">
                        <InputFieldAuth label="" name="p0F24" type="time" required={true} readonly={isCheckFrom} value={datafrom.p0F24} onChange={(e) => handleInputChange(e)} className="w-full min-w-[100px] border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-purple-600 focus:border-purple-600 block p-2.5" />
                        {errTxtErr.p0F24Txt && <DivTextMesErr className="text-sm mb-2 text-red-700 font-semibold" text={errTxtErr.p0F24Txt} />}
                      </div>
                      <div className="flex items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900 label mt-[-5px]">
                          น.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* row สำรวจ ณ วันที่ */}
              </div>

              {/* btnSave */}
              <DivHr divClass="flex justify-center" className="h-px mt-1 mb-1 bg-gray-200 border-0 w-full" />
              {!isCheckFrom && !loadingPage &&
                btnSaveShow()
              }
              {loadingPage ? (<LoadingCheck setHeight="h-auto mt-5" color="amber" txt="กำลังตรวจสอบข้อมูล" />) : isCheckFrom && btnSaveShow()}

            </form>
          </div>
        </div>
      </div>
      <ModalSave isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} handleSubmit={handleSubmit} />
    </>
  )
}

export default Page0