import AsyncStorage from '@react-native-async-storage/async-storage';


export const setSessionId = (session_id) => {
    AsyncStorage.setItem("session_ci", session_id);

}
export  const setUserId = async (user_id) => {
  await  AsyncStorage.setItem("user_id", user_id);

}

export const setBattleId = (user_id) => {
    AsyncStorage.setItem("battle_id", user_id);
}
export const setAvatar = (avatar) => {
    AsyncStorage.setItem("avatar", avatar);
}
export const setFullName = (name) => {
    AsyncStorage.setItem("name", name);
}
export const getSessionId = () => {
    return getItem('session_ci'); 

}
export const   getUserId =  () => {
    return getItem("user_id");
}
export const getBattleId= () => {
    return  getItem('battle_id'); 
}
export const getAvatar= () => {
    return  getItem('avatar'); 
}
export const getFullName= () => {
    return  getItem('name'); 
}

export const logout = async() => {
    AsyncStorage.clear();
}
  export async function getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      console.log(value);
      return value;
    } catch (error) {
      // Handle errors here
    }
  }

