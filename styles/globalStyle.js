import { StyleSheet } from "react-native";
import { colours } from "./colours";

export default StyleSheet.create({



    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      titleText: {
        
        borderColor:colours.green,
        borderWidth: 5,
        borderRadius: 10,
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: colours.green,
        marginBottom: 50,
        textAlign: 'center',
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
      },
      miniTitle: {
        
        borderColor:colours.green,
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: colours.green,
        textAlign: 'center',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
      },


      secondaryTitleText: {

        fontSize: 25,
        
        fontFamily: "Arial",
        fontWeight: "bold",
        color: colours.darkGreen,
        textAlign: 'center',
        padding: 15,
        marginBottom:5,

        

      },

      normalText: {
        fontSize:12,
        fontFamily: "Arial",
        color: 'black',
        padding: 10, 
        textAlign: 'center'
      },

      inputView:{
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        width: 235,
        height: 40,
        marginBottom: 12,
        marginTop: 3,
        padding: "2.5%",
        alignItems: 'center',
        borderColor: '#999',
        borderWidth: 1  
      },

      textInput: {
        height: 30,
        flex: 1,
        padding: 5,
        marginLeft: 20,
      },

      inputButton: {
        
        width: 90,
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
       
        marginLeft: '1%',
        marginRight: '1%',
        padding: "1%",
        backgroundColor: colours.darkGreen,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

      },

      altInputButton: {

        width: 90,
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginLeft: '1%',
        marginRight: '1%',
        padding: "1%",
        backgroundColor: colours.lightGrey,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

      },

      mainAppButton: {
        width: "75%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        marginLeft: '1%',
        marginRight: '1%',
        padding: "1%",
        backgroundColor: colours.darkGreen,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },

      buttonText: {
        fontSize: "85%",
        color: "#fff",
        padding: 5,
    
      },

      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 5,
        marginBottom: 5
      },

      errorStyle: {
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "400",
        color: '#FF0000',
        textAlign: 'center'
      },

      searchBar:{
        backgroundColor: colours.white,
        width: '90%',
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },
      pageContainer:{
        width:'90%',
        height: '90%',
        alignItems:'center'
      },

      
      
});