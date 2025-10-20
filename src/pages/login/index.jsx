import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login, recuperarSenha } from "../../services/authService";
import './styles.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/admin'); 
    } catch {
      setError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); 
  };

  const handlePasswordReset = async () => {
    const userEmail = prompt("Por favor, digite seu e-mail para recuperação de senha:");
    if (userEmail) {
      try {
        await recuperarSenha(userEmail);
        alert('Um link para redefinir sua senha foi enviado para o seu e-mail, caso ele esteja cadastrado.');
        setError(''); // Limpa erros antigos
      } catch {
        setError('Falha ao enviar e-mail. Verifique se o e-mail está correto.');
      }
    }
  };
 return (
    <div className='loginPage'>
      <div className='loginContainer'>
        <h2 className='title'>Login do Administrador</h2>
        <form onSubmit={handleLogin} className='form'>
          <input
            className='input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
          {/* 4. Envolva o input de senha e o ícone em uma div */}
          <div className='passwordWrapper'>
            <input
              className='input'
              type={isPasswordVisible ? 'text' : 'password'} // O tipo do input agora é dinâmico
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            {/* O ícone que chama a função de toggle */}
            <span onClick={togglePasswordVisibility} className='eyeIcon'>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className='button'>
            Entrar
          </button>
        </form>
        <p className='error'>{error}</p>
       <button onClick={handlePasswordReset} className='forgotPassword'>
          Esqueci minha senha
        </button>
      </div>
    </div>
  );
};


export default LoginPage;