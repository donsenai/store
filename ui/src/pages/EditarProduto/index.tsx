import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Produto {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    __v?: number;
}

export default function EditarProduto() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const response = await axios.get<Produto>(`http://localhost:3000/produto/${id}`);
                setProduto(response.data); 
            } catch (error) {
                alert("Erro ao carregar os dados do produto.");
                navigate("/");
            }
        };

        if (id) buscarProduto();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const dadosAtualizados = {
            nome: formData.get('nome'),
            preco: Number(formData.get('preco')),
            descricao: formData.get('descricao'),
        };

        try {
            await axios.put(`http://localhost:3000/produto/${id}`, dadosAtualizados);
            alert("Produto atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert("Erro ao salvar as alterações.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '450px', borderRadius: '12px' }}>
                <h2 className="text-center mb-4 text-secondary fw-semibold">Editar Produto</h2>

                {produto && (
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        <div>
                            <label className="form-label text-muted small fw-medium">Nome do Produto</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6" 
                                name="nome" 
                                defaultValue={produto.nome} 
                                required 
                            />
                        </div>

                        <div>
                            <label className="form-label text-muted small fw-medium">Preço (R$)</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg fs-6" 
                                name="preco" 
                                step="0.01"
                                defaultValue={produto.preco} 
                                required 
                            />
                        </div>

                        <div>
                            <label className="form-label text-muted small fw-medium">Descrição</label>
                            <textarea 
                                className="form-control form-control-lg fs-6" 
                                name="descricao" 
                                rows={3}
                                defaultValue={produto.descricao} 
                                required 
                            />
                        </div>

                        <div className="d-flex gap-2 mt-2">
                            <button 
                                type="button" 
                                className="btn btn-light btn-lg w-50 fw-medium"
                                onClick={() => navigate("/")}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg w-50 fw-medium"
                                style={{ backgroundColor: '#4F46E5', borderColor: '#4F46E5' }}
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}