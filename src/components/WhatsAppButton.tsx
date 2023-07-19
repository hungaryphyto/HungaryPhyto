import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Estilos personalizados para o ícone do WhatsApp
const whatsappIconStyle = {
  fontSize: '4rem', // Defina o tamanho desejado para o ícone
  color: '#25D366', // Defina a cor desejada para o ícone
};

const WhatsAppButton = () => {

  // Número de telefone para o qual você deseja enviar a mensagem
  const phoneNumber = import.meta.env.VITE_REACT_WPP_NUMBER
  const message = import.meta.env.VITE_REACT_WPP_MSG

  // Construa a URL do WhatsApp com o número de telefone e a mensagem pré-definida
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link to={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon style={whatsappIconStyle} />
    </Link>
  );
};

export default WhatsAppButton;