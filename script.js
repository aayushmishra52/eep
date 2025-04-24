const codeDisplay = document.getElementById('code-display');
const outputDisplay = document.getElementById('output-display');

const codeData = {
    'btn1': {
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    void (*display)(void*);
    char name[20];
} Animal;

void Animal_display(void* self) {
    Animal* animal = (Animal*)self;
    printf("Animal: %s\n", animal->name);
}

Animal* Animal_create(const char* name) {
    Animal* a = malloc(sizeof(Animal));
    strcpy(a->name, name);
    a->display = Animal_display;
    return a;
}

typedef struct {
    Animal base;
    int age;
} Dog;

void Dog_display(void* self) {
    Dog* dog = (Dog*)self;
    printf("Dog: %s, Age: %d\n", dog->base.name, dog->age);
}

Dog* Dog_create(const char* name, int age) {
    Dog* d = malloc(sizeof(Dog));
    strcpy(d->base.name, name);
    d->age = age;
    d->base.display = Dog_display;
    return d;
}

int main() {
    Animal* animal = Animal_create("Generic Animal");
    Dog* dog = Dog_create("Buddy", 5);

    Animal* animals[] = {(Animal*)animal, (Animal*)dog};

    for(int i = 0; i < 2; i++) {
        animals[i]->display(animals[i]);
    }

    free(animal);
    free(dog);

    return 0;
}`, 
        output: `Animal: Generic Animal\nDog: Buddy, Age: 5`
    },
    'btn2': {
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
} Person;


void initPersonDefault(Person *p) {
    strcpy(p->name, "aayush");
    p->age = 0;
}

void initPersonWithName(Person *p, const char *name) {
    strncpy(p->name, name, sizeof(p->name)-1);
    p->name[sizeof(p->name)-1] = '\0'; // Ensure null termination
    p->age = 0;
}

void initPersonWithNameAge(Person *p, const char *name, int age) {
    strncpy(p->name, name, sizeof(p->name)-1);
    p->name[sizeof(p->name)-1] = '\0'; // Ensure null termination
    p->age = age;
}

int main() {
    Person p1, p2, p3;

    initPersonDefault(&p1);
    initPersonWithName(&p2, "Alice");
    initPersonWithNameAge(&p3, "Bob", 30);

    printf("Person 1: Name = %s, Age = %d\n", p1.name, p1.age);
    printf("Person 2: Name = %s, Age = %d\n", p2.name, p2.age);
    printf("Person 3: Name = %s, Age = %d\n", p3.name, p3.age);

    return 0;
}`, 
        output: `Person 1: Name = aayush, Age = 0\nPerson 2: Name = Alice, Age = 0\nPerson 3: Name = Bob, Age = 30`
    },
    'btn3': {
        code: `#include <stdio.h>

int findMax(int arr[], int size) {
    if (size <= 0) return -1; // Handle empty or invalid size array
    int max = arr[0];
    for(int i = 1; i < size; i++) {
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}

int main() {
    int n;

    printf("Enter number of elements: ");
  
    // scanf("%d", &n);
    n = 5; // Simulated input
    printf("%d\n", n);

    int arr[n]; 
    printf("Enter %d elements:\n", n);
    }
    arr[0] = 10; arr[1] = 5; arr[2] = 25; arr[3] = 15; arr[4] = 30;
    printf("10 5 25 15 30\n"); // Show simulated input

    int maxElement = findMax(arr, n);
    printf("Maximum element in the array is: %d\n", maxElement);

    return 0;
}`, 
        output: `Enter number of elements: 5\nEnter 5 elements:\n10 5 25 15 30\nMaximum element in the array is: 30`
    }
};

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const data = codeData[button.id];
        if (data) {
            codeDisplay.textContent = data.code;
            outputDisplay.textContent = data.output;
        } else {
            codeDisplay.textContent = '// Code not found for this button.';
            outputDisplay.textContent = '// Output not found for this button.';
        }
    });
});
