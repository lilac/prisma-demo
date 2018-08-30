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
    Filter
} from 'react-admin';

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
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <ReferenceInput label="User" source="agent.id" reference="Agent">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <LongTextInput source="content"/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="agent.id" reference="Agent">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <LongTextInput source="content"/>
        </SimpleForm>
    </Create>
);
