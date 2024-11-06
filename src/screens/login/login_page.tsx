import React, {useContext, useState} from 'react';
import {Text, View, TextInput, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '../../../src/provider/auth_provider';
import {COLORS, globalStyles} from '../../../global_style';
import {styles} from './login_styles';
import {EyeIcon, EyeOffIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import NavigationComponent from '../../components/navigation_component';

export type RootStackParamList = {
  Login: undefined;
  Navigation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Navigation"
        component={NavigationComponent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function LoginPage() {
  type LoginPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Navigation'
  >;
  const navigation = useNavigation<LoginPageNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const {signIn} = authContext;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    const result = await signIn();
    if (result) {
      navigation.navigate('Navigation');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Plex Wish</Text>

      <Controller
        control={control}
        rules={{
          required: "L'adresse email est requise.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Le format de l'email est incorrect.",
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={globalStyles.input}
            placeholder="Entrez votre adresse email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={globalStyles.errorText}>{errors.email.message}</Text>
      )}
      <View style={styles.passwordContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Le mot de passe est requis.',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères.',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={globalStyles.input}
              placeholder="Entrez votre mot de passe"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={globalStyles.errorText}>{errors.password.message}</Text>
        )}

        <Pressable
          style={styles.togglePasswordButton}
          onPress={() => setShowPassword(prevState => !prevState)}>
          {showPassword ? (
            <EyeOffIcon color={COLORS.black} size={24} />
          ) : (
            <EyeIcon color={COLORS.black} size={24} />
          )}
        </Pressable>
      </View>

      <View style={styles.connectionButton}>
        <Pressable style={globalStyles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={globalStyles.buttonText}>Se connecter</Text>
        </Pressable>

        <Pressable
          style={[globalStyles.button, {backgroundColor: COLORS.gray}]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={[globalStyles.buttonText, {color: COLORS.white}]}>
            S'inscrire
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginStack;
