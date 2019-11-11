/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as Categories} from './Categories'
export {default as Cart} from './Cart'
export {Login, Signup} from './AuthForm'

export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as AddProduct} from './AddProduct'

export {default as SingleUser} from './SingleUser'
export {default as UserHome} from './UserHome'
export {default as PasswordReset} from './PasswordReset'

export {default as SingleOrderView} from './SingleOrderView'

export {default as AdminHub} from './admin/AdminHub'

export {default as NotAvailible} from './NotAvailible'
