import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";

const Page = ({children}) => {
    return (
        <>
            <Navbar />

            {children}
            
            <Footer />
        </>
    )
}

export default Page;