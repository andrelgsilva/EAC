import "react-native-get-random-values";
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(
  "Cd3Ve07j9y29MtpjdVgKjs0MUjHD2kNVDXd5SV6X",
  "jJvxB60ET9twutc3xRsboW7Vp6OhRFvWRdFWAsdQ"
);


Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;