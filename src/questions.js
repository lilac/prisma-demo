import React from 'react';
import {
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from 'react-admin';

const QuestionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="search" source="title_contains" alwaysOn />
    </Filter>
);

const AnswerReference = (props) => (
    <ReferenceField source="answer.id" reference="Post" {...props}>
        <TextField source="title"/>
    </ReferenceField>
);

export const QuestionList = (props) => (
    <List title="resources.Question.name" filters={<QuestionFilter/>} {...props}>
        <Datagrid>
            <TextField source="title"/>
            <AnswerReference label="resources.Question.fields.answer"/>
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

const QuestionTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const QuestionShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <ReferenceField source="answer.id" reference="Post" label="resources.Question.fields.answer">
                <TextField source="title"/>
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const QuestionEdit = (props) => (
    <Edit title={<QuestionTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="title"/>
            <ReferenceField source="answer.id" reference="Post" label="resources.Question.fields.answer">
                <TextField source="title"/>
            </ReferenceField>
        </SimpleForm>
    </Edit>
);

export const QuestionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <ReferenceField source="answer.id" reference="Post" label="resources.Question.fields.answer">
                <TextField source="title"/>
            </ReferenceField>
        </SimpleForm>
    </Create>
);
