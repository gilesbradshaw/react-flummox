import PageFactory, {pageMaker} from "../../../utils/PageFactory";

const pages = [
  new PageFactory()
    .path("add")
    .title("Add"),
  new PageFactory()
    .path("update")
    .title("Update"),
  new PageFactory()
    .path("central-lead")
    .title("Central lead"),
  new PageFactory()
    .path("listing")
    .title("Listing"),
  new PageFactory()
    .path("orders")
    .title("Orders"),
  new PageFactory()
    .path("exec-diary")
    .title("Exec diary"),
  new PageFactory()
    .path("used-ehicle-stock-list")
    .title("Used vehicle stock list"),
  new PageFactory()
    .path("trade-in-search")
    .title("Trade in search"),
  new PageFactory()
    .path("vista-report")
    .title("Vista report")
];

const toBeExported = pageMaker("enquiry", "sales-enquiry", "Enquiry", pages);
export default toBeExported.Page;
export const {routes, Menu} = toBeExported;
