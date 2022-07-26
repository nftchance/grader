import Navbar from '@components/Navbar/Navbar';
import Footer from "@components/Footer/Footer";

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