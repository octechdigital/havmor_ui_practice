import {
  BaseResponse,
  CreateUserPayload,
  CreateUserResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpResponse,
} from "../interface/api";
import {
  decryptData,
  sendEncrytedData,
  authorisedEncrytedApiCall,
} from "./encrypt";
import { defaultCatch, fetchHandlerText, responseHelper } from "./utils";
import store from "../store/store";
import { toast } from "react-toastify";

const jsonHeaders: { [key: string]: string } = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

class APIS {
  private showLoader = (loaderTitle?: string | undefined) => {};
  private hideLoader = (loaderTitle?: string | undefined) => {};
  private static instance: APIS | null = null;
  public instanceId = "TEST";
  private static activityTimer: NodeJS.Timer;

  constructor(instanceId: string) {
    this.instanceId = instanceId;
    // document.addEventListener("click", this.logActivity);
  }

  static getInstance() {
    return APIS.instance || (APIS.instance = new APIS("TEST NEW 1"));
  }

  initialize(
    showLoader: (loaderTitle?: string | undefined) => void,
    hideLoader: () => void
  ) {
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  // private logActivity() {
  //   // console.log("LOG", "ACTIVTY");
  //   clearTimeout(APIS.activityTimer);
  //   const auth = store.getState().authReducer;
  //   if (auth && auth.accessToken) {
  //     // console.log("LOG", "INACTIVITY TIMER STARTED", new Date());
  //     APIS.activityTimer = setTimeout(() => {
  //       // console.log("LOG", "LOGGING USER OUT", new Date());
  //       // logoutUser();
  //       toast.info("Your session has been expired");
  //     }, 20 * 60 * 1000);
  //   }
  // }

  async createUser(): Promise<CreateUserResponse> {
    const payload: CreateUserPayload = {};
    const state = store.getState();
    const { accessToken } = state.authReducer;
    let masterKey = localStorage.getItem("thumsup-tbh-user-id");
    if (masterKey) {
      payload.masterKey = masterKey;
    }
    const headers = jsonHeaders;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("utm_source")) {
      payload.utm_source = urlParams.get("utm_source");
    }
    // const ipInfo = await this.ipLookup();
    // if (ipInfo) {
    //   payload.ipInfo = ipInfo;
    //   store.dispatch(setIpDetails(ipInfo));
    // }
    this.showLoader("Starting session...");
    return fetch(`${process.env.REACT_APP_API_BASE_URL}users`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  // private ipLookup(): Promise<IpWhoIsData> {
  //   this.showLoader("Setting up...");
  //   return fetch("https://ipwhois.pro/?key=yfybFTXnrwjxJuJr")
  //     .then(fetchHandler)
  //     .then((response) => response.data)
  //     .finally(this.hideLoader);
  // }

  getOTP(mobile: string): Promise<BaseResponse> {
    // this.logActivity();
    this.showLoader("Sending OTP...");
    return sendEncrytedData("users/getOTP/", { mobile })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  verifyOTP(otp: string, token: string): Promise<VerifyOtpResponse> {
    // this.logActivity();
    this.showLoader("Verifying OTP...");
    return sendEncrytedData("users/verifyOTP/", { otp, token })
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  register(payload: RegisterPayload): Promise<RegisterResponse> {
    // this.logActivity();
    this.showLoader("Saving details...");
    return sendEncrytedData("users/register/", payload)
      .then(fetchHandlerText)
      .then(decryptData)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  // sendAuthCall(payload: any): Promise<BaseResponse> {
  //   // this.logActivity();
  //   this.showLoader("loading message...");
  //   return authorisedEncrytedApiCall("users/sendReferralReminder/", payload)
  //     .then(fetchHandlerText)
  //     .then(decryptData)
  //     .then(responseHelper)
  //     .catch(defaultCatch)
  //     .finally(this.hideLoader);
  // }
}
const API = APIS.getInstance();

export default API;
