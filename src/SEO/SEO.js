const SEO = ({ title, description }) => {
    return ( 
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
        </>
    )
} 

export default SEO;