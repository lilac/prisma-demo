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
    TextInput,
    CardActions,
    CreateButton,
    ExportButton,
    RefreshButton
} from 'react-admin';

const {cloneElement} = React;

const QuestionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="search" source="title_contains" alwaysOn/>
    </Filter>
);

const AnswerReference = (props) => (
    <ReferenceField source="answer.id" reference="Post" {...props}>
        <TextField source="title"/>
    </ReferenceField>
);

const Actions = ({
                     basePath,
                     bulkActions,
                     currentSort,
                     displayedFilters,
                     exporter,
                     filters,
                     filterValues,
                     onUnselectItems,
                     resource,
                     selectedIds,
                     showFilter
                 }) => (
    <CardActions>
        {bulkActions && cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        <ExportButton
            resource={resource}
            sort={currentSort}
            filter={filterValues}
            exporter={exporter}
        />
        <RefreshButton/>
    </CardActions>
);

export const QuestionList = (props) => (
    <List title="resources.Question.name" filters={<QuestionFilter/>} actions={<Actions/>} {...props}>
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
            <TextField source="title"/>
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
