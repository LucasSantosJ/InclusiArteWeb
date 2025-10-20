import React, { useState, useEffect } from 'react';
import {
  getPecas,
  criarPeca,
  atualizarPeca,
  deletarPeca,
  getArtesaos // Precisamos dos artesãos para o dropdown
} from '../../services/firestoreService';
import '../GerenciarArtesaos/styles.css'; // o mesmo estilo da página de GerenciarArtesaos

const GerenciarPecas = () => {
  const [pecas, setPecas] = useState([]);
  const [artesaos, setArtesaos] = useState([]);

  // States do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [artesaoIdSelecionado, setArtesaoIdSelecionado] = useState('');

  const [editandoId, setEditandoId] = useState(null);
  
  const carregarDados = async () => {
    // Carrega tanto as peças quanto os artesãos
    const listaPecas = await getPecas();
    const listaArtesaos = await getArtesaos();
    setPecas(listaPecas);
    setArtesaos(listaArtesaos);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const limparFormulario = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setArtesaoIdSelecionado('');
    setEditandoId(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artesaoIdSelecionado) {
      alert("Por favor, selecione um artesão.");
      return;
    }

    const dadosPeca = {
      nome,
      descricao,
      preco: Number(preco), // Converte o preço para número
      artesaoId: artesaoIdSelecionado
    };

    if (editandoId) {
      await atualizarPeca(editandoId, dadosPeca);
    } else {
      await criarPeca(dadosPeca);
    }

    limparFormulario();
    carregarDados();
  };
  
  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta peça?")) {
      await deletarPeca(id);
      carregarDados();
    }
  };

  const handleEditar = (peca) => {
    setEditandoId(peca.id);
    setNome(peca.nome);
    setDescricao(peca.descricao);
    setPreco(peca.preco);
    setArtesaoIdSelecionado(peca.artesaoId);
  };

  // Função auxiliar para pegar o nome do artesão a partir do ID
  const getNomeArtesao = (id) => {
    const artesao = artesaos.find(a => a.id === id);
    return artesao ? artesao.nomeSocial : 'Desconhecido';
  };

  return (
    <div className="admin-container">
      <h1>Gerenciar Peças</h1>

      <div className="form-container">
        <h2>{editandoId ? 'Editando Peça' : 'Adicionar Nova Peça'}</h2>
        <form onSubmit={handleSubmit}>
          {/* O Dropdown para selecionar o artesão */}
          <select value={artesaoIdSelecionado} onChange={(e) => setArtesaoIdSelecionado(e.target.value)} required>
            <option value="" disabled>Selecione um artesão</option>
            {artesaos.map(artesao => (
              <option key={artesao.id} value={artesao.id}>
                {artesao.nomeSocial}
              </option>
            ))}
          </select>

          <input type="text" placeholder="Nome da Peça" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          <input type="number" placeholder="Preço (ex: 79.90)" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          
          <div className="form-buttons">
            <button type="submit">{editandoId ? 'Salvar Alterações' : 'Adicionar'}</button>
            {editandoId && <button type="button" onClick={limparFormulario}>Cancelar Edição</button>}
          </div>
        </form>
      </div>

      <div className="list-container">
        <h2>Peças Cadastradas</h2>
        {pecas.map((peca) => (
          <div key={peca.id} className="list-item">
            <div>
              <h3>{peca.nome}</h3>
              <p>Artesão: <strong>{getNomeArtesao(peca.artesaoId)}</strong></p>
              <p>Preço: R$ {peca.preco}</p>
            </div>
            <div className="item-buttons">
              <button onClick={() => handleEditar(peca)}>Editar</button>
              <button onClick={() => handleDeletar(peca.id)} className="delete-button">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciarPecas;