import React, { useState } from "react";
import Tarefa from "./tarefa/tarefa";

const Lista = () => {
  const [tarefas, setTarefas] = useState([
    { key: 1, nome: "Aprender React", concluida: true },
    { key: 2, nome: "Criar um projeto", concluida: false },
  ]);

  const [input, setInput] = useState("");
  const [filtro, setFiltro] = useState(true);
  const [ignorarFiltro, setIignorarFiltro] = useState(true);

  const concluirTarefa = (key, concluida) => {
    setTarefas((tarefas) =>
      tarefas.map((tarefa) => {
        if (tarefa.key === key) {
          return { ...tarefa, concluida };
        }
        return tarefa;
      })
    );
  };

  const handleFiltroChange = (e) => {
    const value = e.target.value;

    if (value === 'todos') {
      setIignorarFiltro(true);
    } else {
      setIignorarFiltro(false);
    }

    if (value === 'concluidas') {
      setFiltro(true);
    } else if (value === 'naoConcluidas') {
      setFiltro(false);
    }
  };

  const addTarefa = () => {
    if (input) {
      setTarefas((tarefas) => [
        ...tarefas,
        {
          key: tarefas.length > 0 ? tarefas[tarefas.length - 1].key + 1 : 1,
          nome: input,
          concluida: false,
        },
      ]);
    } else {
      alert("Digite um nome diferente para a tarefa!");
    }
  };

  function deletar(key) {
     //tarefas = tarefas onde tarefa.key é diferente de key
    setTarefas((tarefas) => tarefas.filter((tarefa) => tarefa.key !== key));
  }

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTarefa}>adicionar</button>
      </div>
      <div>
        <input type="radio" id="todos" name="filtro" defaultChecked value="todos" onChange={handleFiltroChange}/>
        <label htmlFor="todos">Todos</label>

        <input type="radio" id="concluidas" name="filtro" value="concluidas" onChange={handleFiltroChange}/>
        <label htmlFor="concluidas">Concluídas</label>

        <input type="radio" id="naoConcluidas" name="filtro" value="naoConcluidas" onChange={handleFiltroChange}/>
        <label htmlFor="naoConcluidas">Não Concluídas</label>
      </div>
      {tarefas.length > 0 ? (
        <div>
          {/* se ignorarFiltro for true, não filtra nada, se não, mostra apenas concluidas ou apenas não concluidas*/}
          {tarefas.map((tarefa) =>
            ignorarFiltro || filtro == tarefa.concluida ? (
              <Tarefa tarefa={tarefa} concluirTarefa={concluirTarefa}  deletar = {deletar}/>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        <p>A lista está vazia</p>
      )}
    </div>
  );
};

export default Lista;
