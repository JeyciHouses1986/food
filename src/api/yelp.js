import axios from "axios";

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer ' + 'BQ0VmqgmcPi_LkresVGKy0fElG4m-aAl1eHRBp3UUN2P6iVNDsJgHktKzOB4tmqbxwGdZFTdDQUs_misxBnT4QcghWdFEfk3itnny3a0t07fg-fQ2wpT0xWH35qmZXYx',
    },
});
