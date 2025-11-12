import { FaInstagram, FaPinterest, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t shadow-sm">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-10">
      
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="font-bold text-[24px]">eCommerce</h1>
        </div>

      
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-600">
          <a
            href="https://dontpad.com/trabalhofinalSerratec2025/2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            POLÍTICA DE PRIVACIDADE
          </a>
          <a
            href="https://dontpad.com/trabalhofinalSerratec2025/2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            ENVIO & PAGAMENTOS
          </a>
        </div>

    
        <div className="flex justify-center gap-5 mt-6 text-gray-600 text-xl">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaInstagram />
          </a>
          <a href="https://br.pinterest.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaPinterest />
          </a>
          <a
            href="https://www.tiktok.com/login?redirect_url=https%3A%2F%2Fwww.tiktok.com%2Fpt-BR%2F&lang=en&enter_method=mandatory"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaTiktok />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaTwitter />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaYoutube />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
