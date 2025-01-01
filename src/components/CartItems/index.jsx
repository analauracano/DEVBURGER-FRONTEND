import { Table } from '../index';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Trashicon from '../../assets/trash.svg';
import { ButtonGroup, EmptyCartWrapper, ProductImage, TrashImage} from './styles';

export function CartItems() {
    const { cartProducts, decreaseProduct, increaseProduct, deleteProduct } = useCart();

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts && cartProducts.length > 0 ? (
                    cartProducts.map(product => (
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <ProductImage src={product.url} alt={product.name} />
                            </Table.Td>
                            <Table.Td>
                                <span>{product.name}</span>
                            </Table.Td>
                            <Table.Td>
                                <span>{formatPrice(product.price)}</span>
                            </Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button 
                                        type="button" 
                                        onClick={() => decreaseProduct(product.id)} 
                                        aria-label={`Diminuir quantidade de ${product.name}`}
                                    >
                                        -
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => increaseProduct(product.id)} 
                                        aria-label={`Aumentar quantidade de ${product.name}`}
                                    >
                                        +
                                    </button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <span>{formatPrice(product.quantity * product.price)}</span>
                            </Table.Td>
                            <Table.Td>
                                <TrashImage 
                                    src={Trashicon} 
                                    alt="Remover item" 
                                    onClick={() => deleteProduct(product.id)} 
                                    aria-label={`Remover ${product.name} do carrinho`} 
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={6}>
                            <EmptyCartWrapper>Carrinho vazio</EmptyCartWrapper>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Body>
        </Table.Root>
    );
}
