import { userToken } from "../cookies";

const getGithubInfo = async () => {
    if(userToken){
        const res = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: "token " + userToken
            }
        });
      
        return res.json();
    }
};

export const userGitInfo = await getGithubInfo();