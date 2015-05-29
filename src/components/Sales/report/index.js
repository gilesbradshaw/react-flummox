import PageFactory, {pageMaker} from "../../../utils/PageFactory";

const pages = [
  new PageFactory()
    .path("daily-activity-log")
    .title("Daily actiity log"),
  new PageFactory()
    .path("deal-builder-plus")
    .title("Deal builder plus"),
  new PageFactory()
    .path("enquiry-funnel")
    .title("Enquiry funnel"),
  new PageFactory()
    .path("extended-sales")
    .title("Extended sales"),
  new PageFactory()
    .path("forwarded-contact")
    .title("Forwarded contact"),
  new PageFactory()
    .path("holiday-absence")
    .title("Holiday absence"),
  new PageFactory()
    .path("lost-sales-analysis")
    .title("Lost sales analysis"),
  new PageFactory()
    .path("lost-sales-log")
    .title("Lost sales log"),
  new PageFactory()
    .path("physical-contact")
    .title("Physical contact"),
  new PageFactory()
    .path("preparation")
    .title("Preparation"),
  new PageFactory()
    .path("sales-report")
    .title("Sales report"),
  new PageFactory()
    .path("text-message")
    .title("Text message"),
  new PageFactory()
    .path("volvo")
    .title("Volvo"),
  new PageFactory()
    .path("volvo-sales-activity")
    .title("Volvo sales activity")
];


const toBeExported = pageMaker("report", "sales-report", "Report", pages);
export default toBeExported.Page;
export const {routes, Menu} = toBeExported;
