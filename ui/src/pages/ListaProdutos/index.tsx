import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Produto {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    __v?: number;
}

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const response = await fetch("http://localhost:3000/produto/"); 
                
                if (!response.ok) {
                    throw new Error("Erro ao buscar os produtos do backend");
                }
                
                const json = await response.json();
                setProdutos(json.data);
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        };

        carregarProdutos();
    }, []);

    return (
        <>
            <div className="container-fluid py-4">
                <h1 className="text-center">Lista Produtos</h1>
                <Link to="">Inserir Produto</Link>
                
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {produtos.map((produto) => (
                        <div className="col" key={produto._id}> 
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">R$ {produto.preco}</p>
                                    <p className="card-text">{produto.descricao}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
