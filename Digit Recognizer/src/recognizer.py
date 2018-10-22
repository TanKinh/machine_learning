import pandas as pd
import numpy as np
from subprocess import check_output

train_df = pd.read_csv("../input/train.csv")
test_df = pd.read_csv("../input/test.csv")

import matplotlib.pyplot as plt

x_train = np.array(train_df.iloc[:,1:].values)

y_train = np.array(train_df.iloc[:,0].values)

x_test = np.array(test_df.iloc[:, 0:].values)

from sklearn.svm import SVC
model_svm = SVC(kernel = 'linear', C = 1e5)

model_svm.fit(x_train, y_train)

y_predict = model_svm.predict(x_test)

submissions=pd.DataFrame({"ImageId": list(range(1,len(y_pre)+1)),
                         "Label": y_pre})
submissions.to_csv("mnist_tfkeras.csv", index=False, header=True)