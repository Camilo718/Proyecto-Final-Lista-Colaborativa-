import {Navigate} from 'react-router-dom'
import { useAuth } from '../Context/useAuth.js'



export default function PrivateRoute({ children }) {
    const { user } = useAuth()

    return user ? children : <Navigate to="/login" />



}
