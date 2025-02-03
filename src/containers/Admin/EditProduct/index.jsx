import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Container,
    Form,
    InputGroup,
    Label,
    Input,
    LabelUploads,
    Select,
    SubmitButton,
    ErrorMessage,
    ContainerCheckBox
} from './styles';

const schema = yup.object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup
        .number()
        .positive()
        .required('Digite o preço do produto')
        .typeError('Digite o preço do produto'),
    category: yup.object().required('Escolha uma categoria'),
    offer: yup.bool(),
}).required();

export function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product || null;

    useEffect(() => {
        async function loadCategories() {
            try {
                const { data } = await api.get('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        }
        if (!product) return navigate("/admin/produtos")
        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const productFormData = new FormData();

        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        if (data.file && data.file.length > 0) {
            productFormData.append('file', data.file[0]);
        }
        productFormData.append('offer', data.offer);

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando o produto...',
            success: 'Produto editado com sucesso',
            error: 'Falha ao editar o produto, tente novamente',
        });

        setTimeout(() => {
            navigate('/admin/produtos');
        }, 2000);
    };

    if (!product) return <></>;
    
    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} defaultValue={product.name} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} defaultValue={product ? product.price / 100 : 0} />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUploads>
                        <Image />
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            {...register('file')}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                setFileName(file?.name || 'Nenhum arquivo selecionado');
                            }}
                        />
                        {fileName || 'Upload do Produto'}
                    </LabelUploads>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category || null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Categorias"
                                menuPortalTarget={document.body}
                                onChange={(selected) => field.onChange(selected)}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckBox>
                        <Input
                            type="number"
                            {...register('price')}
                            defaultValue={typeof product.price === 'number' ? product.price / 100 : 0}
                        />
                        <Label>Produto em Oferta</Label>
                    </ContainerCheckBox>
                </InputGroup>

                <SubmitButton type="submit">Editar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
