import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';

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
    ContainerCheckBox,
} from './styles';

const schema = yup.object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: yup.object().shape({
        id: yup.string().required('Escolha uma categoria'),
        name: yup.string().required(),
    }).required('Escolha uma categoria'),
    offer: yup.bool(),
    file: yup.mixed()
        .test('required', 'Escolha um arquivo para continuar', (value) => value && value.length > 0)
        .test('fileSize', 'Carregue arquivos até 5mb', (value) => value && value.length > 0 && value[0].size <= 5 * 1024 * 1024) // Convertendo para bytes
        .test('type', 'Carregue apenas imagens PNG ou JPEG', (value) => value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type)),
}).required();

export function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            try {
                const { data } = await api.get('/categories');
                console.log("Categorias carregadas:", data);
                setCategories(data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
                toast.error("Erro ao carregar categorias");
            }
        }
        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            category: null, // Garante que o campo comece vazio
        }
    });

    const onSubmit = async (data) => {
        const productFormData = new FormData();
    
        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando o produto...',
            success: 'Produto criado com sucesso',
            error: 'Falha ao adicionar o produto, tente novamente',
        });

        setTimeout(() => {
            navigate('/admin/produtos');
        }, 2000);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>  

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
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
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Categorias"
                                isClearable
                                defaultValue={null}
                                onChange={(selected) => field.onChange(selected)}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckBox>
                        <input type='checkbox' {...register('offer')} />
                        <Label>Produto em Oferta</Label>
                    </ContainerCheckBox>
                </InputGroup>

                <SubmitButton type="submit">Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    );
}
