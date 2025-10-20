import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Importa a conexão do arquivo anterior

export const login = async (email, password) => {
  try {
    // Chama a função do Firebase e espera a resposta
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erro no serviço de autenticação:", error.code);
    throw new Error("Falha na autenticação");
  }
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const recuperarSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação:", error.code);
    throw error; // Lança o erro para o componente tratar
  }
};