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
        <TextInput label="search" source="q" alwaysOn />
        <ReferenceInput label="User" source="author.id" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = (props) => (
    <List title="resources.posts.name" filters={<PostFilter/>} {...props}>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField label="user" source="author.id" reference="User">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="title"/>
            <TextField source="content"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({record}) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <ReferenceInput label="User" source="author.id" reference="User">
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
            <ReferenceInput label="User" source="author.id" reference="User">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <LongTextInput source="content"/>
        </SimpleForm>
    </Create>
);
