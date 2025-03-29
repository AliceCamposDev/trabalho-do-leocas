import { useState } from "react";
import { useEffect } from "react";
import "./tarefa.css"

function Tarefa({tarefa, concluirTarefa, deletar}) {

  const [concluida, setConcluida] = useState(tarefa.concluida);

  useEffect(() => {
    setConcluida(tarefa.concluida);
  }, [tarefa.concluida]);

  function handleConcluirTarefa(){
    setConcluida(!concluida);
    concluirTarefa(tarefa.key, !concluida);
  }

  function handleDeletar(){
    if (window.confirm("Você tem certeza que deseja excluir essa tarefa?")) {
      deletar(tarefa.key);
    }
  }

  return (
    <div>
      <p>{tarefa.nome}</p>
      <input type="checkbox" checked={concluida} onChange={handleConcluirTarefa}/>
      <button onClick={handleDeletar}>Excluir</button>
    </div>
  );
}

export default Tarefa;
