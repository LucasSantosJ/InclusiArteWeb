import { db } from "./firebaseConfig"; 
import { 
  collection,
  addDoc,     
  getDocs,    
  doc,        
  updateDoc,  
  deleteDoc   
} from "firebase/firestore";

const artesaosCollectionRef = collection(db, "artesaos");

export const criarArtesao = async (novoArtesao) => {
  
  await addDoc(artesaosCollectionRef, novoArtesao);
};

export const getArtesaos = async () => {
  const data = await getDocs(artesaosCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const atualizarArtesao = async (id, camposAtualizados) => {
  const artesaoDoc = doc(db, "artesaos", id);
  await updateDoc(artesaoDoc, camposAtualizados);
};

export const deletarArtesao = async (id) => {
  const artesaoDoc = doc(db, "artesaos", id);
  await deleteDoc(artesaoDoc);
};

// CRUD de peças
const pecasCollectionRef = collection(db, "pecas");

export const criarPeca = async (novaPeca) => {
 
  await addDoc(pecasCollectionRef, novaPeca);
};

// READ
export const getPecas = async () => {
  const data = await getDocs(pecasCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// UPDATE
export const atualizarPeca = async (id, camposAtualizados) => {
  const pecaDoc = doc(db, "pecas", id);
  await updateDoc(pecaDoc, camposAtualizados);
};

// DELETE
export const deletarPeca = async (id) => {
  const pecaDoc = doc(db, "pecas", id);
  await deleteDoc(pecaDoc);
};