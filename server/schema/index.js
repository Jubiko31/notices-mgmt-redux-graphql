const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { Notes, Category } = require('../models');
const { Op } = require('sequelize')

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
  }),
});

const NotesType = new GraphQLObjectType({
  name: 'Notes',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent) {
        return Category.findByPk(parent.categoryId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    notes: {
      type: new GraphQLList(NotesType),
      resolve() {
        return Notes.findAll();
      },
    },
    notesWithLimit: {
      type: new GraphQLList(NotesType),
      args: {
        limit: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: new GraphQLNonNull(GraphQLString) },
        fromDate: { type: GraphQLString },
        toDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Notes.findAll(
          { 
            limit: args.limit, 
            offset: args.offset, 
            where: { 
              date: { 
                [Op.between]: [args.fromDate || 0, args.toDate || Infinity], 
              }, 
            },
          }, 
        );
      },
    },
    totalCount: {
      type: GraphQLInt,
      resolve() {
        return Notes.count();
      } 
    },
    note: {
      type: NotesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Notes.findByPk(args.id);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.findAll();
      },
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findByPk(args.id);
      },
    },
    filterByDate: {
      type: new GraphQLList(NotesType),
      args: {
        fromDate: { type: GraphQLString },
        toDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Notes.findAll({
          where: { date: { [Op.between]: [args.fromDate || 0, args.toDate || Infinity], }
          }
        });
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add new note
    addNote: {
      type: NotesType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const note = new Notes({
          name: args.name,
          surname: args.surname,
          email: args.email,
          phone: args.phone,
          text: args.text,
          date: args.date,
          categoryId: args.categoryId,
        });

        return note.save();
      },
    },
    // delete a note
    deleteNote: {
      type: NotesType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
         Notes.destroy({
          where: {
            id: args.id,
          },
        });

        return Notes.findAll();
      },
    },
    // add new category
    addCategory: {
      type: CategoryType,
      args: {
        category: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const category = new Category({
          category: args.category,
        });

        return category.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
