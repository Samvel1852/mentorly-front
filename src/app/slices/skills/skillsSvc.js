import { myAxios } from '../../../helpers/axiosInstance'

export default {
   async getOne() {
       return myAxios.get('/skills')
   }
}