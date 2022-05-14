import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    Button
} from 'react-native';

import Book from '../../models/Book';
import BookCard from '../cards/book_card';

type Props = {};

export default class BooksListView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            books: this.props.books,
            navigation: this.props.navigation
        };
    }

    showListBooks() {
        let result;
        result = this.state.books.map((book: Book, key: any) =>
            <BookCard book={book} key={key} navigation={this.props.navigation}/>
        );

        return result;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books            
            , navigation: nextProps.navigation
        });
    }
  
    render() {
        return (
            <ScrollView style={styles.view_list_container}>

                {this.showListBooks()}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    view_list_container: {
      width:"100%",
      flex: 1,
      //justifyContent: 'center',
     // alignItems: 'center',

    }
  
  });