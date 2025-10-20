import React, { useState, useEffect } from 'react';
import {
  getArtesaos,
  criarArtesao,
  atualizarArtesao,
  deletarArtesao
} from '../../services/firestoreService';
import './styles.css'; 

const GerenciarArtesaos = () => {
  const [artesaos, setArtesaos] = useState([]);
  const [nome, setNome] = useState('');
  const [historia, setHistoria] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState('Ativo');

  const [editandoId, setEditandoId] = useState(null);

  const carregarArtesaos = async () => {
    const data = await getArtesaos();
    setArtesaos(data);
  };

  // useEffect para carregar os dados quando o componente for montado
  useEffect(() => {
    carregarArtesaos();
  }, []);

  // Limpa o formulário
  const limparFormulario = () => {
    setNome('');
    setHistoria('');
    setWhatsapp('');
    setStatus('Ativo');
    setEditandoId(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      const artesaoAtualizado = { nomeSocial: nome, historia, whatsapp, status };
      await atualizarArtesao(editandoId, artesaoAtualizado);
    } else {
      const novoArtesao = { nomeSocial: nome, historia, whatsapp, status };
      await criarArtesao(novoArtesao);
    }

    limparFormulario();
    carregarArtesaos(); 
  };
  
  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este artesão?")) {
      await deletarArtesao(id);
      carregarArtesaos(); 
    }
  };

  // Função para popular o formulário quando clicar em "Editar"
  const handleEditar = (artesao) => {
    setEditandoId(artesao.id);
    setNome(artesao.nomeSocial);
    setHistoria(artesao.historia);
    setWhatsapp(artesao.whatsapp);
    setStatus(artesao.status);
  };

  return (
    <div className="admin-container">
      <h1>Gerenciar Artesãos</h1>

      <div className="form-container">
        <h2>{editandoId ? 'Editando Artesão' : 'Adicionar Novo Artesão'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome Social"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <textarea
            placeholder="História"
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="WhatsApp (ex: 5511999998888)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{editandoId ? 'Salvar Alterações' : 'Adicionar'}</button>
            {editandoId && <button type="button" onClick={limparFormulario}>Cancelar Edição</button>}
          </div>
        </form>
      </div>

      <div className="list-container">
        <h2>Artesãos Cadastrados</h2>
        {artesaos.map((artesao) => (
          <div key={artesao.id} className="list-item">
            <div>
              <h3>{artesao.nomeSocial}</h3>
              <p>Status: {artesao.status}</p>
            </div>
            <div className="item-buttons">
              <button onClick={() => handleEditar(artesao)}>Editar</button>
              <button onClick={() => handleDeletar(artesao.id)} className="delete-button">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciarArtesaos;