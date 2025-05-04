import * as yup from "yup";
const phoneRegExp = /^[0-9]{10}$/;
const phoneRegExpInAcademia = /^[0-8]{9}$/;
const telephoneRegExp = /^[0-9]{10}$/;

// login schema
export const formLoginSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});
export const formEmailSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
});

// Signup schema
export const formSignupSchema = yup.object().shape({
  firstName: yup
    .string("Enter your first name")
    .min(2, "Name should be of minimum 4 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(2, "Name should be of minimum 4 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
  phone: yup
    .string("Enter your phone number")
    // .matches(phoneRegExp, "Phone number is not valid, i.e 03030888007")
    .required("Phone is required"),
  password: yup
    .string("Enter your password")
    .min(7, "minimum seven letters are required for password")
    .max(30, "maximum thirty letters are required for password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[-'/~!#*$@_%+=.,^&(){}[]|;:”<>?\]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const formSignupSchemaAcademia = yup.object().shape({
  firstName: yup
    .string("Enter your first name")
    // .min(4, "Name should be of minimum 4 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(4, "Name should be of minimum 4 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email!")
    .required("Email is required"),
  phone: yup
    .string("Enter your phone number")
    .matches(
      phoneRegExpInAcademia,
      "Phone number is not valid, i.e 03030888007"
    )
    .required("Phone is required"),
  password: yup
    .string("Enter your password")
    .min(8, "minimum eight letters are required for password")
    .max(30, "maximum thirty letters are required for password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  // focusarea: yup
  //   .string("Focus Area is required")
  //   .required("Sekect your Focus Area"),
});

export const AdminCreateProjectValidation = yup.object().shape({
  title: yup
    .string("Enter your Project Title")
    .min(10, "Title should be atleast 10 charaters long")
    .required("Title is required"),
  description: yup
    .string("Enter your Project Description")
    .min(100, "Description of your Project should be hundred charaters long"),
  organization: yup.string("Enter your Project Description"),
  department: yup.string("Enter your Project Description"),
  // image: yup.mixed().test("fileType", "Invalid file type", (value) => {
  //   if (!value) return true;
  //   return ["image/"].includes(value.type);
  // }),
  // category: yup.string("Enter your Project Category"),
  userAgency: yup.mixed().nullable(),
  userProjectDetailsSubmittor: yup.mixed().nullable(),
  fundingAgency: yup.mixed().nullable(),
  fundingScheme: yup.string("application field"),
  applicationField: yup.string("application field"),
  researchSubDomain: yup.string("research sub Domain"),
  objectives: yup.string("objectives"),
  deliverables: yup.string("deliverables"),
  description: yup.string("description"),
  methodology: yup.string("methodology"),
  references: yup.string("references"),
  physicalAspect: yup.string("physicalAspect"),
  performanceAspect: yup.string("performanceAspect"),
  compatibilityAspect: yup.string("compatibilityAspect"),
  enviromentalAspect: yup.string("enviromentalAspect"),
  specOfProduct: yup.string("specOfProduct"),
  logisticAspect: yup.string("logisticAspect"),
  fireHazard: yup.string("fireHazard"),
  image: yup.mixed(),
  assignedTo: yup.array(),
  // uploadFiles: yup.array(),
  // proposalText: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string(),
  //   })
  // ),
  // proposalfile: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string(),
  //   })
  // ),
  // testing: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string(),
  //   })
  // ),
  // financialProposal: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string(),
  //   })
  // ),
});
// Signup schema
const MAX_FILE_SIZE = 1024000; //100KB
const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

export const formAcademiaSchema = yup.object().shape({
  firstName: yup
    .string("Enter your Name")
    .min(2, "Name should be of minimum 4 characters length"),
  lastName: yup
    .string("Enter your Name")
    .min(2, "Name should be of minimum 4 characters length"),
  designation: yup.string("Enter designation"),
  currentUniversity: yup.string("Enter your University"),
  department: yup.string("Enter your Department"),
  image: yup.mixed(),
  email: yup.string("Enter your email").email("Enter a valid email!"),
  phone: yup.string("Enter your phone number"),
  // .matches(
  //   phoneRegExpInAcademia,
  //   "Phone number is not valid, i.e 03030888007"
  // ),
  image: yup.mixed(),
  categories: yup.array().of(yup.string()),

  telephone: yup
    .string("Enter your telephone")
    .matches(telephoneRegExp, "Telephone number is not valid, i.e 03030888007"),
  description: yup.string("Enter your description"),
  qualificationSection: yup.array().of(
    yup.object().shape({
      degree: yup.string(),
      university: yup.string(),
      start: yup.string(),
      end: yup.string(),
    })
  ),
  experienceSection: yup.array().of(
    yup.object().shape({
      post: yup.string(),
      university: yup.string(),
      start: yup.string(),
      end: yup.string(),
    })
  ),
  awardsSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      year: yup.string(),
      awardedBy: yup.string(),
    })
  ),
  scopusSection: yup.array().of(
    yup.object().shape({
      scopus: yup.string(),
      WoS: yup.string(),
      profileScopus: yup.string(),
      scienceScopus: yup.string(),
    })
  ),
  socialMediaSection: yup.array().of(
    yup.object().shape({
      linkedin: yup.string(),
      twitter: yup.string(),
      youtube: yup.string(),
    })
  ),
  membershipSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      name: yup.string(),
      start: yup.string(),
      end: yup.string(),
    })
  ),
  researchProjectsSection: yup.array().of(
    yup.object().shape({
      type: yup.string(),
      sponcer: yup.string(),
      title: yup.string(),
      status: yup.string(),
      cost: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
    })
  ),
  industrialProjectsSection: yup.array().of(
    yup.object().shape({
      type: yup.string(),
      sponcer: yup.string(),
      title: yup.string(),
      status: yup.string(),
      cost: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
    })
  ),
  researchArticlesSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      name: yup.string(),
      journal: yup.string(),
      issue: yup.string(),
      impact: yup.string(),
      citations: yup.string(),
      quartiesOne: yup.string(),
      quartiesTwo: yup.string(),
    })
  ),
  conferenceSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      name: yup.string(),
      citations: yup.string(),
      conferenceTitle: yup.string(),
    })
  ),
  bookChapSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      name: yup.string(),
      publisher: yup.string(),
      author: yup.string(),
      publishedPages: yup.string(),
    })
  ),
  bookSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      publisher: yup.string(),
      author: yup.string(),
      publishedPages: yup.string(),
      citation: yup.string(),
    })
  ),
  editorialSection: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      IF: yup.string(),
      typePaper: yup.string(),
      datePaper: yup.string(),
      publicationDate: yup.string(),
    })
  ),
  patentsSection: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      inventorName: yup.string(),
      status: yup.string(),
      approvalDate: yup.string(),
      type: yup.string(),
      inventor: yup.string(),
    })
  ),
  copyRightsSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      inventorName: yup.string(),
      nameOfUni: yup.string(),
      patentName: yup.string(),
      status: yup.string(),
      approvalDate: yup.string(),
    })
  ),
  industrialDesignsSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      inventorName: yup.string(),
      inventorSchool: yup.string(),
      status: yup.string(),
      approvalDate: yup.string(),
    })
  ),
  technologyTransferedSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      techName: yup.string(),
      iprs: yup.string(),
      pl: yup.string(),
      licensedDate: yup.string(),
      piSchool: yup.string(),
      sector: yup.string(),
    })
  ),
  attendedSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      organizedBy: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
    })
  ),
  organizedSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      organizedBy: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
    })
  ),
  phdSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      college: yup.string(),
      name: yup.string(),
      field: yup.string(),
    })
  ),
  mastersSection: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      college: yup.string(),
      name: yup.string(),
      field: yup.string(),
    })
  ),
});

export const IndustryCreateProfileValidation = yup.object().shape({
  name: yup
    .string("Enter your company name")
    .min(5, "Name should be of minimum 5 characters length"),
  addressOne: yup.string("Enter your address"),
  addressTwo: yup.string("Enter your address"),
  registrationNo: yup
    .string("Enter your registration no")
    .min(4, " should be of minimum 4 characters length"),
  // registrationDate: yup.string("Enter your registration Date "),
  firmType: yup.string("Enter your taxId"),
  taxId: yup.string("Enter your taxId"),
  nationalTax: yup.string("Enter your taxId"),
  SalesTax: yup.string("Enter your taxId"),
  image: yup.mixed(),
  businessType: yup.string("Enter your business type"),
  industryType: yup.string("Enter your industry  type"),
  industrySpecialization: yup.string("Enter your industry Specialization"),
  // .matches(phoneRegExp, "Phone number is not valid, i.e 03030888007"),
  description: yup.string("Enter your description"),
  pasProjectDefence: yup.string("Enter your description"),
  blacklisted: yup.string("Enter your description"),
  caseAgainstFirm: yup.string("Enter your description"),
  deposit: yup.string("Enter your description"),
  categories: yup.array().of(yup.string()),
  partnerFirm: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      type: yup.string(),
    })
  ),
  localBank: yup.array().of(
    yup.object().shape({
      bank: yup.string(),
      branch: yup.string(),
      accountNo: yup.string(),
    })
  ),
  foreignBank: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      type: yup.string(),
      awardedBy: yup.string(),
    })
  ),
  registerWithGov: yup.array().of(
    yup.object().shape({
      organization: yup.string(),
      regNo: yup.string(),
      dateOfReg: yup.string(),
      dateOfValidity: yup.string(),
      category: yup.string(),
    })
  ),
  pastContract: yup.array().of(
    yup.object().shape({
      contract: yup.string(),
      organization: yup.string(),
      contractValue: yup.string(),
      completed: yup.string(),
      remarks: yup.string(),
    })
  ),
});
export const IndustrySubmitProposal = yup.object().shape({
  companyName: yup
    .string("Enter your company name")
    .min(5, "Name should be of minimum 4 characters length"),
  partnerFirm: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      type: yup.string(),
    })
  ),
  milesStones: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
      description: yup.string(),
    })
  ),
});
