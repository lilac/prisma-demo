import React from 'react';
import {
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
    Show,
    SimpleShowLayout,
    BooleanField,
    RichTextField,
    ReferenceManyField,
    ShowButton,
    DeleteButton
} from 'react-admin';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="search" source="title_contains" alwaysOn />
        <ReferenceInput label="user" source="agent.id" reference="Agent" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = (props) => (
    <List title="resources.Post.name" filters={<PostFilter/>} {...props}>
        <Datagrid>
            <ReferenceField label="user" source="agent.id" reference="Agent">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="title"/>
            <TextField source="content"/>
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <RichTextField source="content" />
            <BooleanField source="published" />
            <ReferenceManyField
                label="resources.Question.name"
                reference="Question"
                target="answer">
                <Datagrid>
                    <TextField source="title" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

const CreateRelatedQuestionButton = ({ record }) => (
    <Button
        variant="fab"
        component={Link}
        to={{
            pathname: '/question/create',
            state: { record: { answer: { id: record.id } } },
        }}
    >
        <AddIcon/>
    </Button>
);

export const PostEdit = (props) => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <ReferenceInput source="agent.id" reference="Agent">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <LongTextInput source="content"/>
            <BooleanField source="published" />
            <ReferenceManyField
                label="resources.Question.name"
                reference="Question"
                target="answer">
                <Datagrid>
                    <TextField source="title" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </ReferenceManyField>
            <CreateRelatedQuestionButton/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="agent.id" reference="Agent">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <LongTextInput source="content"/>
        </SimpleForm>
    </Create>
);
