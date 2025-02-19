import logo from '../../../../src/assets/logo.png'

const Footer = () => {
    return (
        <div className="p-10 pb-5 bg-black">
            <footer className="footer grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 max-w-5xl mx-auto">
                <footer className="container mx-auto text-base-content flex flex-col justify-center items-center -mt-3">
                    <div className="flex items-center gap-2 text-gray-300">
                        <img src={logo} alt="siteLogo" className="w-12" />
                        <h2 className="text-3xl font-extrabold">LearnHive</h2>
                    </div>
                    <p className="text-center text-gray-400">At LearnHive we help students with the essential study preparation they need to clear their exam and provide tutors with the performance they deserve.</p>
                </footer>

                {/* 1 nav */}
                <nav className='flex flex-col items-center text-gray-400'>
                    <h6 className="text-lg uppercase font-bold text-gray-300">Quick Links</h6>
                    <a className=" link link-hover text-base hover:text-blue-500">Home</a>
                    <a className="link link-hover text-base hover:text-blue-500">Blog</a>
                    <a className="link link-hover text-base hover:text-blue-500">FAQs</a>
                    <a className="link link-hover text-base hover:text-blue-500">Contact Us</a>
                </nav>
                {/* 2 nav */}
                <nav className='flex flex-col items-center text-gray-400'>
                    <h6 className="text-lg uppercase font-bold text-gray-300">Media</h6>
                    <a className="link link-hover text-base hover:text-blue-500" href='https://www.facebook.com/ashraful.islam.ratul.455820?mibextid=ZbWKwL'
                        target="_blank">Facebook</a>
                    <a className="link link-hover text-base hover:text-blue-500" href="https://x.com/?lang=en" target="_blank">Twitter</a>
                    <a className="link link-hover text-base hover:text-blue-500" href="https://www.instagram.com/" target="_blank">Instagram</a>
                </nav>
            </footer>
            <p className="text-center text-gray-400 pt-10">&copy; {new Date().getFullYear()} LearnHive. All rights reserved.</p>
            <p className="text-center text-gray-400">Designed, Developed and Maintained by Ashraful Islam</p>
        </div>
    );
};

export default Footer;