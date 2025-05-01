import numpy as np

# VALIDACIONES GENERALES
def validar_matriz(m):
    if m is None:
        raise ValueError("La matriz no puede ser None.")
    if not isinstance(m, np.ndarray):
        raise TypeError("Debe ser una matriz de tipo numpy.ndarray.")
    if m.size == 0:
        raise ValueError("La matriz está vacía.")
    if np.isnan(m).any():
        raise ValueError("La matriz contiene valores nulos.")
    if not np.issubdtype(m.dtype, np.number):
        raise TypeError("La matriz debe contener solo valores numéricos.")
    return True

# GENERACIÓN DE MATRICES ALEATORIAS
def generar_matriz(filas, columnas, min_val=0, max_val=10):
    if filas <= 0 or columnas <= 0:
        raise ValueError("Las dimensiones deben ser mayores que cero.")
    matriz = np.random.randint(min_val, max_val, size=(filas, columnas))
    return matriz

# INGRESO MANUAL DE MATRICES
def ingresar_matriz(filas, columnas):
    print(f"\nIngrese los valores de una matriz de {filas}x{columnas}:")
    data = []
    for i in range(filas):
        while True:
            try:
                fila = input(f"Fila {i+1} (separe los valores con espacios): ")
                valores = list(map(int, fila.strip().split()))
                if len(valores) != columnas:
                    print(f"Error: Se esperaban {columnas} valores. Intente nuevamente.")
                    continue
                data.append(valores)
                break
            except ValueError:
                print("Entrada inválida. Asegúrese de ingresar números enteros.")
    return np.array(data)

# COMPROBACIÓN DE LA CONMUTATIVIDAD DE LA SUMA: A + B == B + A
def propiedad_conmutativa(A, B):
    validar_matriz(A)
    validar_matriz(B)
    return np.allclose(A + B, B + A)

# COMPROBACIÓN DE LA ASOCIATIVIDAD DE LA SUMA: (A + B) + C == A + (B + C)
def propiedad_asociativa_suma(A, B, C):
    validar_matriz(A)
    validar_matriz(B)
    validar_matriz(C)
    return np.allclose((A + B) + C, A + (B + C))

# COMPROBACIÓN DE LA DISTRIBUTIVIDAD: A*(B+C) == A*B + A*C
def propiedad_distributiva(A, B, C):
    validar_matriz(A)
    validar_matriz(B)
    validar_matriz(C)
    if B.shape != C.shape:
        raise ValueError("Las matrices B y C deben tener la misma dimensión para sumarlas.")
    if A.shape[1] != B.shape[0]:
        raise ValueError("Dimensiones incompatibles para multiplicar A y B (o C).")
    return np.allclose(A @ (B + C), A @ B + A @ C)

# CALCULA LA INVERSA DE UNA MATRIZ (si es cuadrada e invertible)
def inversa_matriz(A):
    validar_matriz(A)
    if A.shape[0] != A.shape[1]:
        raise ValueError("La matriz debe ser cuadrada para calcular su inversa.")
    return np.linalg.inv(A)

# GENERA UNA MATRIZ IDENTIDAD DE DIMENSIÓN n
def matriz_identidad(n):
    if n <= 0:
        raise ValueError("La dimensión debe ser mayor que cero.")
    return np.eye(n)

def main():
    print("Seleccione una propiedad a comprobar:")
    print("1. Conmutativa de la suma (A + B = B + A)")
    print("2. Asociativa de la suma (A + (B + C) = (A + B) + C)")
    print("3. Distributiva de la multiplicación sobre la suma (A*(B + C) = A*B + A*C)")
    print("4. Inversa de una matriz (A * A^-1 = I)")
    print("5. Matriz identidad (I * A = A)")
    print()
    
    opcion = input("Opción (1/2/3/4/5): ").strip()
    aleatorio = input("¿Desea generar matrices aleatorias? (s/n): ").strip().lower() == "s"
    
    # Para las opciones 4 y 5 se necesita una matriz cuadrada
    if opcion in ["4", "5"]:
        while True:
            try:
                n = int(input("Ingrese la dimensión (n x n): "))
                if n <= 0:
                    print("La dimensión debe ser mayor que cero. Intente nuevamente.")
                    continue
                filas = n
                columnas = n
                break
            except ValueError:
                print("Entrada inválida. Ingrese un número entero.")
    else:
        while True:
            try:
                filas = int(input("Número de filas: "))
                columnas = int(input("Número de columnas: "))
                if filas <= 0 or columnas <= 0:
                    print("Las dimensiones deben ser mayores que cero. Intente nuevamente.")
                    continue
                break
            except ValueError:
                print("Entrada inválida. Ingrese números enteros.")
    
    # Función auxiliar para obtener una matriz (aleatoria o por ingreso manual)
    def get_matriz(nombre):
        if aleatorio:
            print(f"\nGenerando matriz {nombre} aleatoria:")
            return generar_matriz(filas, columnas)
        else:
            print(f"\nIngreso manual de la matriz {nombre}:")
            return ingresar_matriz(filas, columnas)
    
    if opcion == "1":
        # Opción 1: Conmutativa de la suma
        A = get_matriz("A")
        B = get_matriz("B")
        print("\nMatriz A:\n", A)
        print("\nMatriz B:\n", B)
        print("\n¿Se cumple que A + B = B + A? ->", propiedad_conmutativa(A, B))
    
    elif opcion == "2":
        # Opción 2: Asociativa de la suma
        A = get_matriz("A")
        B = get_matriz("B")
        C = get_matriz("C")
        print("\nMatriz A:\n", A)
        print("\nMatriz B:\n", B)
        print("\nMatriz C:\n", C)
        print("\n¿Se cumple que (A + B) + C = A + (B + C)? ->", propiedad_asociativa_suma(A, B, C))
    
    elif opcion == "3":
        # Opción 3: Distributiva de la multiplicación sobre la suma
        A = get_matriz("A")
        B = get_matriz("B")
        C = get_matriz("C")
        print("\nMatriz A:\n", A)
        print("\nMatriz B:\n", B)
        print("\nMatriz C:\n", C)
        try:
            resultado = propiedad_distributiva(A, B, C)
            print("\n¿Se cumple que A*(B + C) = A*B + A*C? ->", resultado)
        except ValueError as e:
            print("\nError:", e)
    
    elif opcion == "4":
        # Opción 4: Inversa de la matriz (A * A^-1 = I)
        A = get_matriz("A")
        print("\nMatriz A:\n", A)
        try:
            A_inv = inversa_matriz(A)
            print("\nInversa de A:\n", A_inv)
            print("\nProducto A * A^-1:\n", A @ A_inv)
        except np.linalg.LinAlgError:
            print("\nLa matriz A no es invertible.")
        except ValueError as ve:
            print("\nError:", ve)
    
    elif opcion == "5":
        # Opción 5: Matriz identidad (I * A = A)
        I = matriz_identidad(filas)
        A = get_matriz("A")
        print("\nMatriz Identidad I:\n", I)
        print("\nMatriz A:\n", A)
        print("\nProducto I * A:\n", I @ A)
    
    else:
        print("\nOpción no válida.")

if __name__ == "__main__":
    main()