import { Button, Checkbox, Grid, debounce, styled } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import InputFields from "../../../InputFields/InputFields";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CloudUpload,
  Quiz,
} from "@mui/icons-material";
import TypographyGrow from "../../../AnimationMui/TypographyGrow";
import Editor from "../../../Editor";
import { CreateProjectContext } from "../CreateContext";
import AutocompleteMui from "../../../AutocompleteMui";
import DisplayUsers from "./DisplayUsers";
import { useAxios } from "@hooks";
import SelectMui from "@common/MUI/SelectMui";
import DisplayManager from "./DisplayManager";
const GridUpload = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
}));
const TextUpload = styled("span")(() => ({
  color: "#484848",
  fontSize: ".8rem",
  fontWeight: "400",
  lineHeight: "166.5%",
}));
const ButtonUpload = styled(Button)(() => ({
  color: "black",
  fontSize: ".8rem",
  border: "1px solid #D7D7D7",
  background: "linear-gradient(180deg, #FFF 0%, #929292 100%)",
  "&:hover": {
    color: "black",
    border: "1px solid #D7D7D7",
    background: "linear-gradient(180deg, #FFF 0%, #929292 100%)",
  },
}));
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function InitialForm() {
  const [selectedValue, setSelectedValue] = useState("byName");
  const [selectedValueField, setSelectedValueField] = useState("None");
  const [newValFundingAgency, setNewValFundingAgency] = useState([]);

  const [newValUserAgency, setNewValUserAgency] = useState([]);
  const [DataArray, setDataArray] = useState([]);
  const [dataUserAgency, setDataUserAgency] = useState([]);
  const [userData, setUserData] = useState("");
  const [userProjectSubmittors, setUserProjectSubmittors] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [departments, setDepartments] = useState([]);
  const organizationArray = ["Projects directorate"];
  const departmentsArray = ["Def R&D", "Project Dte", "Industrial Dte", "ICON"];
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const { data } = useAxios(`account/getAllUsers?search=${userData}`);
  const { API } = useAxios();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const SearchFilterByFields = () => {
    if (selectedValueField !== "None") {
      setDataArray((prevState) =>
        prevState?.filter((e) => e?.field === selectedValueField)
      );
    }
  };

  // fetch fundingAgency
  const fetchFundingAgency = async (search) => {
    const base_url = "fundingAgency/getAllUsers";
    const url = search?.target?.value
      ? `${base_url}?search=${search?.target.value}`
      : base_url;

    try {
      const data = await API({ url });
      if (data?.result) setDataArray(data?.result);
    } catch (error) {
      setDataArray([]);
    }
  };

  // fetch userAgency
  const fetchUserAgency = async (search) => {
    const base_url = "userAgency/getAllUsers";

    const url = search?.target?.value
      ? `${base_url}?search=${search?.target.value}`
      : base_url;
    try {
      const data = await API({ url });
      if (data?.result) setDataUserAgency(data?.result);
    } catch (error) {
      setDataUserAgency([]);
    }
  };

  // fetch userAgency
  const fetchUserProjectDetailsSubmittor = async (search) => {
    // return console.log(search?.target?.value, "search");
    const base_url = "admin/getAllUserProjectSubmittors";

    const endpoints = search?.target?.value
      ? `${base_url}?search=${search?.target.value}`
      : base_url;
    try {
      const data = await API({ url });
      if (data?.result) setUserProjectSubmittors(data?.result);
    } catch (error) {
      setUserProjectSubmittors([]);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const url = `organizations/getAllOrganizations`;
      const data = await API({ url: url });
      if (data?.type === "success") {
        setOrganization(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDepartments = async () => {
    try {
      const url = `departments/getDepartments?id=${values?.organization}`;
      const data = await API({ url: url });
      console.log(data, "data of getDepartments");
      if (data?.type === "success") {
        setDepartments(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserAgency();
    fetchFundingAgency();
    fetchOrganizations();
    SearchFilterByFields();
    fetchUserProjectDetailsSubmittor();
  }, []);

  const { data: d = [] } = useAxios("admin/getSubAdmins?type=projectManager");
  const arr = d?.result ?? [];

  /* you need to memorie the list otherwise checkbox will not work as expected   */
  const toRender = useMemo(() => {
    return arr?.map((item) => ({
      firstName: item.firstName,
      lastName: item?.lastName,
      _id: item?._id,
    }));
  }, [d]);

  const { setFieldValue, values, errors, touched, handleBlur, handleChange } =
    useContext(CreateProjectContext);
  useEffect(() => {
    fetchDepartments();
  }, [values?.organization]);
  const handleChangeOrganization = (event) => {
    setFieldValue("organization", event.target.value);
  };

  const handleChangeDepartments = (event) => {
    setFieldValue("department", event.target.value);
  };

  // return;
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      rowGap={3}
    >
      <Grid item xs={12}>
        <TypographyGrow
          align={"center"}
          variant={"h1"}
          text={"Brief Introduction"}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          required
          type={"text"}
          label={"Project Title"}
          placeholder={"Your Project Title"}
          name={"title"}
          tooltipText={`Descriptive Title + Keywords (e.g., "Next-Gen Counter-Drone System powered by AI: Securing Airspaces with Signal Intelligence")`}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.title}
          error={!!touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />
      </Grid>
      <Grid item xs={5.9}>
        {DisplayUsers?.length > 0 && (
          <AutocompleteMui
            onInputChange={(newValue) => {
              debounce(fetchUserAgency(newValue), 300);
            }}
            onChange={(event, newValue) => {
              setNewValUserAgency(newValue);
              setFieldValue("userAgency", newValue);
            }}
            options={dataUserAgency}
            selectedValue={values?.userAgency}
            Content={DisplayUsers}
            dataSearch={dataUserAgency}
            placeholder={"Search..."}
            select={selectedValueField}
            filterSelect={selectedValue}
            getOptionLabel={(option) => option?.name ?? ""}
            renderOption={(props, option, { selected }) => {
              return DisplayUsers?.length > 0 ? (
                <li {...props} key={option?._id + option?.email}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 2 }}
                    checked={selected}
                  />
                  {option?.name}
                </li>
              ) : (
                []
              );
            }}
            labelForInput={"User Agency"}
            tooltipIcon={
              <Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />
            }
            tooltipText={`Who provided the financial support for this project (e.g., MoDP, SPD, NUST)?`}
          />
        )}
      </Grid>
      <Grid item xs={5.9}>
        {DisplayUsers?.length > 0 && (
          <AutocompleteMui
            onInputChange={(newValue) => {
              debounce(fetchFundingAgency(newValue), 300);
            }}
            onChange={(event, newValue) => {
              setNewValFundingAgency(newValue);
              setFieldValue("fundingAgency", newValue);
            }}
            options={DataArray}
            selectedValue={values?.fundingAgency}
            Content={DisplayUsers}
            dataSearch={DataArray}
            placeholder={"Search..."}
            select={selectedValueField}
            filterSelect={selectedValue}
            getOptionLabel={(option) => option?.name ?? ""}
            renderOption={(props, option, { selected }) =>
              DisplayUsers?.length > 0 ? (
                <li {...props} key={option?._id + option?.email}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 2 }}
                    checked={selected}
                  />
                  {option?.name}
                  {/* <Content dataUsers={option} /> */}
                </li>
              ) : (
                []
              )
            }
            labelForInput={"Funding Agency"}
            tooltipIcon={
              <Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />
            }
            tooltipText={`Who provided the financial support for this project (e.g., MoDP, SPD, NUST)?`}
          />
        )}
      </Grid>
      <Grid item xs={5.9}>
        {DisplayUsers?.length > 0 && (
          <AutocompleteMui
            onInputChange={(newValue) => {
              console.log(newValue?.target?.value, "newValue");
              debounce(setUserData(newValue), 400);
            }}
            onChange={(event, newValue) => {
              if (newValue?.target?.value) {
                console.log(newValue, "newValue");
                setUserData(newValue?.target?.value);
              } else {
                setUserData("");
              }
              setFieldValue("userProjectDetailsSubmittor", newValue);
            }}
            options={data?.result ?? []}
            Content={DisplayUsers}
            dataSearch={data?.result ?? []}
            placeholder={"Search..."}
            select={selectedValueField}
            selectedValue={values?.userProjectDetailsSubmittor}
            filterSelect={selectedValue}
            getOptionLabel={(option) => option?.account?.name ?? ""}
            renderOption={(props, option, { selected }) =>
              DisplayUsers?.length > 0 ? (
                <li {...props} key={option?._id + option?.email}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 2 }}
                    checked={selected}
                  />
                  {option?.account?.name}
                  {/* <Content dataUsers={option} /> */}
                </li>
              ) : (
                []
              )
            }
            labelForInput={"USERS"}
            tooltipIcon={
              <Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />
            }
            tooltipText={`Who provided the project details through this web application`}
          />
        )}
      </Grid>

      {/* <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Funding Scheme"}
          placeholder={`Write about Funding Scheme`}
          name={"fundingScheme"}
          tooltipText={`Choose the type of funding, such as Research Academia collaboration, competitive grant, or contract for deliverables.`}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.fundingScheme}
          error={!!touched.fundingScheme && !!errors.fundingScheme}
          helperText={touched.fundingScheme && errors.fundingScheme}
        />
      </Grid> */}
      {organization?.length > 0 && (
        <Grid item xs={5.9}>
          <SelectMui
            label={"Organization"}
            value={values?.organization}
            // menuItems={organization}
            menuArrayItems={organization}
            onChange={handleChangeOrganization}
          />
        </Grid>
      )}
      <Grid item xs={5.9}>
        <SelectMui
          label={"Departments"}
          value={values?.department}
          menuArrayItems={departments}
          onChange={handleChangeDepartments}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Funding Scheme"}
          placeholder={`Write about Funding Scheme`}
          name={"fundingScheme"}
          tooltipText={`Choose the type of funding, such as Research Academia collaboration, competitive grant, or contract for deliverables.`}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.fundingScheme}
          error={!!touched.fundingScheme && !!errors.fundingScheme}
          helperText={touched.fundingScheme && errors.fundingScheme}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Application Field"}
          placeholder={"Write About Application Field"}
          name={"applicationField"}
          tooltipText={`Choose the primary realm where your project's application lies (e.g., AI, computer vision, mechatronics, materials, cyber, space etc.)`}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.applicationField}
          error={!!touched.applicationField && !!errors.applicationField}
          helperText={touched.applicationField && errors.applicationField}
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          type={"text"}
          label={"Research Sub-Domain"}
          placeholder={"Write About Research"}
          tooltipText={`Briefly describe the specific technical field within the broader domain. (e.g., Hypersonic Propulsion, Counter-Drone Systems,Electronic Warfare)`}
          name={"researchSubDomain"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.researchSubDomain}
          error={!!touched.researchSubDomain && !!errors.researchSubDomain}
          helperText={touched.researchSubDomain && errors.researchSubDomain}
        />
      </Grid>
      <Grid item xs={12}>
        {toRender?.length > 0 && (
          <AutocompleteMui
            multiple
            onInputChange={(newValue) => {
              debounce(setUserData(newValue), 400);
            }}
            onChange={(event, newValue) => {
              setFieldValue("assignedTo", newValue);
            }}
            Content={DisplayManager}
            dataSearch={toRender ?? ""}
            placeholder={"Search..."}
            selectedValue={values?.assignedTo}
            getOptionLabel={(option) => {
              console.log(option, "option");
              return option?.firstName
                ? option?.firstName + " " + option?.lastName
                : "undefined";
            }}
            renderOption={(props, option, { selected }) =>
              toRender?.length > 0 ? (
                <li {...props} key={option?._id}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 2 }}
                    checked={selected}
                  />
                  {option?.firstName + " " + option?.lastName}
                </li>
              ) : (
                []
              )
            }
            labelForInput={"Assign Project Mangers"}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Editor
          tooltipText={`State the desired outcomes of your research and development.`}
          label={"Objectives"}
          name={`objectives`}
          setFieldValue={setFieldValue}
          value={values?.objectives}
        />
      </Grid>
      <Grid item xs={12}>
        <Editor
          tooltipText={`Outline the timeline for key achievements and specify the corresponding deliverables for each stage. Use clear and measurable descriptions`}
          label={"Deliverables"}
          name={`deliverables`}
          value={values?.deliverables}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <GridUpload item xs={12}>
        <ButtonUpload
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          href="#file-upload"
        >
          Upload a picture
          <VisuallyHiddenInput
            name={"image"}
            onChange={(e) => setFieldValue("image", [e.target.files[0]])}
            // value={values?.image}
            type="file"
          />
        </ButtonUpload>
        {console.log(values?.image, "values?.image")}
        <TextUpload>
          {values?.image
            ? values?.image?.[0]?.name
            : "Attach a Project Picture"}
        </TextUpload>
      </GridUpload>
    </Grid>
  );
}

export default InitialForm;
