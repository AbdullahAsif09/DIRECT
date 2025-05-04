import { Grid, Typography } from "@mui/material";
import InputFields from "@common/InputFields/InputFields";
import MultiInputSection from "@common/MultiInputSection";
import {
  dataAwards,
  dataExperience,
  dataMembership,
  dataQualification,
  dataScopus,
  dataSocialMedia,
} from "./data";
import { useAxios } from "@hooks/index";
import SelectFields from "@common/SelectFields";

const dataArray = [
  "Degree Qualification",
  "Name of Educational Institute/University",
  "Date Of Starting",
  "Date of End",
];
function StepOne({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) {
  const { data } = useAxios("categories");
  const categoriesArray = data?.map((e) => e?.name);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"flex-start"}
      rowGap={8}
      columnGap={4}
    >
      <Grid item xs={12}>
        <Grid
          container
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          rowGap={4}
        >
          <Grid item xs={12}>
            <Typography variant={"h1"}>Profile</Typography>
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Full Name"}
              placeholder={"Enter Your Name"}
              type={"text"}
              name={"name"}
              value={values?.name !== "" && values?.name}
              disable
            />
          </Grid>

          <Grid item xs={5.9}>
            <InputFields
              label={"Designation"}
              placeholder={"Enter Your Designation"}
              type={"text"}
              name={"designation"}
              value={values?.designation}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.designation && !!errors.designation}
              helperText={touched.designation && errors.designation}
            />
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Name of Current University"}
              placeholder={"Enter Your Name of Current University"}
              type={"text"}
              name={"currentUniversity"}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.currentUniversity && !!errors.currentUniversity}
              helperText={touched.currentUniversity && errors.currentUniversity}
            />
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Name of Department"}
              placeholder={"Enter Your Department"}
              type={"text"}
              name={"department"}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.department && !!errors.department}
              helperText={touched.department && errors.department}
            />
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Email"}
              placeholder={"Enter Your Email"}
              type={"email"}
              name={"email"}
              disable
              value={values?.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Mobile Number"}
              placeholder={"Enter Your Mobile Number"}
              type={"text"}
              name={"phone"}
              disable
              value={values?.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
          </Grid>
          <Grid item xs={5.9}>
            <SelectFields
              multiple={true}
              label={"Categories for Applying Projects"}
              type={"categories"}
              valueArray={values?.categories ?? []}
              name={"categories"}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              error={!!touched.categories && !!errors.categories}
              helperText={touched.categories && errors.categories}
              array={categoriesArray}
            />
          </Grid>
          <Grid item xs={5.9}>
            <InputFields
              label={"Introductory Paragraph (2-3 lines)"}
              placeholder={"Your Introductory"}
              type={"textbox"}
              rows={4}
              name={"description"}
              value={values?.description}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          LableHeadings={dataQualification}
          values={values.qualificationSection}
          errors={errors}
          sectionName={"qualificationSection"}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          headingSection={"Profile/Qualtification"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          LableHeadings={dataExperience}
          values={values.experienceSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          sectionName={"experienceSection"}
          headingSection={"Profile/Experience"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          LableHeadings={dataAwards}
          values={values.awardsSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          headingSection={"Profile/Awards"}
          sectionName={"awardsSection"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          LableHeadings={dataScopus}
          values={values.scopusSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          sectionName={"scopusSection"}
          headingSection={"Profile/ Web of Science / Scopus"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          LableHeadings={dataSocialMedia}
          sectionName={"socialMediaSection"}
          values={values.socialMediaSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          headingSection={"Profile/ Social Media"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"membershipSection"}
          LableHeadings={dataMembership}
          values={values.membershipSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          inputData={dataArray}
          headingSection={"Profile/ Membership"}
        />
      </Grid>
    </Grid>
  );
}

export default StepOne;
